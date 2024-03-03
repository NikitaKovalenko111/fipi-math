import { postTaskDtoType } from './dto/postTaskDto.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Task } from '../schemas/task.schema'
import { Query as QueryType } from 'express-serve-static-core'
import { User } from 'src/schemas/auth.schema'

export interface IResponseGetTasks {
    tasks: Task[]
    total: number
}

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async getTasksService(
        query: QueryType,
        isAuth: boolean,
        userId: Types.ObjectId | null,
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
                HttpStatus.BAD_REQUEST,
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
        taskImage: Express.Multer.File,
    ): Promise<Task> {
        const postTaskObject: Task = {
            taskNumber: Number(postTaskDto.taskNumber),
            answer: postTaskDto.answer,
            difficulty: Number(postTaskDto.difficulty),
            fileName: taskImage.filename,
        }

        return this.taskModel.create(postTaskObject)
    }

    deleteTaskService(id: Types.ObjectId): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id)
    }
}
