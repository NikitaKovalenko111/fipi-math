import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Task } from 'src/schemas/task.schema'
import * as jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { taskDto } from 'src/tasks/dto/task.dto'
import {
    checkResultsDto,
    checkVariantBodyDto,
    secondaryPointsTable,
    variantDto,
} from './dto/variant.dto'
import { User } from 'src/schemas/auth.schema'

@Injectable()
export class VariantsService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async generateVariantService(): Promise<variantDto> {
        const tasks: Array<taskDto | Task> = []

        for (let i = 1; i <= 19; i++) {
            const count: number = await this.taskModel.countDocuments({
                taskNumber: i,
            })

            let random: number = Math.round(Math.random() * count)

            if (random === count) {
                random = random - 1
            }

            const task: taskDto | Task = await this.taskModel
                .findOne({
                    taskNumber: i,
                    answer: { $ne: '' },
                })
                .skip(random)
                .exec()

            task.answer = '' as string

            tasks.push(task)
        }

        const variantToken: string = jwt.sign(
            {
                tasks: tasks,
            },
            process.env.JWT_VARIANT_KEY,
        )

        return {
            tasks: tasks,
            variantToken: variantToken,
        }
    }

    async generateVariantWithTokenService(
        variantToken: string,
    ): Promise<variantDto> {
        const variant: variantDto = jwtDecode<variantDto>(variantToken)

        return variant
    }

    async checkVariantService(
        body: checkVariantBodyDto,
    ): Promise<checkResultsDto> {
        const { tasks, answers } = body
        const answersResult: Array<'correct' | 'incorrect' | number> = []

        let primaryPoints: number = 0

        for (let i = 0; i < 19; i++) {
            const answer = answers[i]

            const taskInDb = await this.taskModel.findById(tasks[i]._id)

            if (i <= 11) {
                if (Number(taskInDb.answer) == answer) {
                    primaryPoints = primaryPoints + 1
                    answersResult.push('correct')
                } else {
                    answersResult.push('incorrect')
                }
            } else if (i > 11) {
                if (answers[i]) {
                    primaryPoints = primaryPoints + answers[i]
                    answersResult.push(answers[i])
                } else {
                    answersResult.push(0)
                }
            }
        }

        const checkResults: checkResultsDto = new checkResultsDto(
            primaryPoints,
            secondaryPointsTable[primaryPoints - 1],
            answersResult,
        )

        return checkResults
    }

    async getVariantAnswersService(
        variantToken: string,
    ): Promise<Array<string>> {
        const tasksArray: Array<taskDto> = jwtDecode<{
            tasks: Array<taskDto>
            iat: number
        }>(variantToken).tasks
        const answers: Array<string> = []

        for (let i = 0; i < tasksArray.length; i++) {
            const el = tasksArray[i]
            if (el.taskNumber >= 13) {
                const currentTask: taskDto = await this.taskModel.findById(
                    el._id,
                )

                answers.push(currentTask.answer)
            }
        }

        return answers
    }
}
