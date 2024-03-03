import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
    Query,
    Req,
} from '@nestjs/common'
import { IResponseGetTasks, TasksService } from './tasks.service'
import { Task } from '../schemas/task.schema'
import { Types } from 'mongoose'
import { postTaskDtoType } from './dto/postTaskDto.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as uniqid from 'uniqid'
import { Query as QueryType } from 'express-serve-static-core'
import { Request } from 'express'
import { tokenPayloadType } from 'src/auth/dto/auth.dto'
import TokenService from 'src/auth/token.service'

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService,
        private tokenService: TokenService,
    ) {}

    @Get()
    async getTasks(
        @Query() query: QueryType,
        @Req() req: Request,
    ): Promise<IResponseGetTasks> {
        const accessToken: string = req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : null
        let isAuth: boolean = false
        let userData: tokenPayloadType

        try {
            userData = this.tokenService.validateAccessToken(accessToken)
        } catch (error) {
            if (error.statusCode === 401) {
                isAuth = false
            }
        }

        if (userData) {
            isAuth = true
        }

        const id = userData ? userData.id : null

        return this.tasksService.getTasksService(query, isAuth, id)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: Types.ObjectId): Promise<Task> {
        return this.tasksService.getTaskByIdService(id)
    }

    @Post('/')
    @UseInterceptors(
        FileInterceptor('taskImage', {
            storage: diskStorage({
                destination: './tasks',
                filename: (req, file, callback) => {
                    const fileName: string = uniqid(
                        `${req.body.taskNumber}_`,
                        '.png',
                    )

                    callback(null, fileName)
                },
            }),
        }),
    )
    postTask(
        @Body() postTaskDto: postTaskDtoType,
        @UploadedFile() taskImage: Express.Multer.File,
    ): Promise<Task> {
        return this.tasksService.postTaskService(postTaskDto, taskImage)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: Types.ObjectId): Promise<Task> {
        return this.tasksService.deleteTaskService(id)
    }
}
