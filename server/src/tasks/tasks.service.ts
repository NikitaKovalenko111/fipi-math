import { postTaskDtoType } from './dto/postTaskDto.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Task } from '../schemas/task.schema'
import { Query as QueryType } from 'express-serve-static-core'
import { User } from 'src/schemas/auth.schema'
import { ServiceError } from 'src/utils'
import { taskDto } from './dto/task.dto'

export interface IResponseGetTasks {
    tasks: Task[]
    total: number
}

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async getTasksService(
        query: QueryType,
        isAuth: boolean,
        userId: Types.ObjectId | null
    ): Promise<IResponseGetTasks> {
        let userInDb
        let solvedTasks

        if (isAuth) {
            userInDb = await this.userModel.findById(userId)
            solvedTasks = userInDb.solvedTasks
        }

        const resultsPerPage: number = Number(query.pageSize)
        const page: number = Number(query.page)
        const skip: number = resultsPerPage * (page - 1)

        const difficultySort = query.difficultySort

        if (
            !(
                query.difficultySort == '1' ||
                query.difficultySort == '-1' ||
                query.difficultySort == undefined
            )
        )
            throw new HttpException(
                'difficultySort can be only 1 or -1',
                HttpStatus.BAD_REQUEST
            )

        const findQueries = {}

        if (!!query.difficulty) {
            Object.assign(findQueries, { difficulty: Number(query.difficulty) })
        }

        if (!!query.taskNumber) {
            Object.assign(findQueries, { taskNumber: Number(query.taskNumber) })
        }

        if (query.isAnswer && Number(query.isAnswer) == 1) {
            Object.assign(findQueries, {
                answer: { $ne: '' },
            })
        }

        if (Number(query.isSolved) && isAuth) {
            Object.assign(findQueries, {
                _id: { $in: solvedTasks },
            })
        }

        if (Number(query.isUnsolved) && isAuth) {
            Object.assign(findQueries, {
                _id: { $nin: solvedTasks },
            })
        }

        const tasks = await this.taskModel
            .find(findQueries)
            .sort({ difficulty: difficultySort == '1' ? 1 : -1 })
            .limit(resultsPerPage)
            .skip(skip)
            .exec()

        const total: number = await this.taskModel
            .countDocuments(findQueries)
            .exec()

        return {
            tasks: tasks,
            total: total,
        }
    }

    getTaskByIdService(id: Types.ObjectId): Promise<Task> {
        return this.taskModel.findById(id)
    }

    postTaskService(
        postTaskDto: postTaskDtoType,
        taskImage: Express.Multer.File
    ): Promise<Task> {
        const postTaskObject: Task = {
            taskNumber: Number(postTaskDto.taskNumber),
            answer: postTaskDto.answer,
            difficulty: 0,
            difficultyMarks: [],
            fileName: taskImage.filename,
        }

        return this.taskModel.create(postTaskObject)
    }

    deleteTaskService(id: Types.ObjectId): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id)
    }

    async setDifficultyTaskService(
        userId: Types.ObjectId,
        difficulty: number,
        taskId: Types.ObjectId
    ): Promise<taskDto> {
        const task = await this.taskModel.findById(taskId)
        const user = await this.userModel.findById(userId)

        if (!user) {
            throw new ServiceError(
                'Пользователь не авторизован',
                HttpStatus.UNAUTHORIZED
            )
        }

        if (!task) {
            throw new ServiceError('Задание не найдено', HttpStatus.NOT_FOUND)
        }

        user.ratedTasks.push(taskId)

        await user.save()

        task.difficultyMarks.push(difficulty)

        let averageDifficulty: number = 0
        let sum: number = 0

        if (task.difficultyMarks.length > 0) {
            task.difficultyMarks.forEach((el) => {
                sum += el
            })

            averageDifficulty = Math.floor(sum / task.difficultyMarks.length)
        }

        task.difficulty = averageDifficulty

        await task.save()

        return task
    }
}
