import { TaskSchema } from './../schemas/task.schema'
import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Task } from '../schemas/task.schema'
import { MulterModule } from '@nestjs/platform-express'
import TokenService from 'src/auth/token.service'
import { Token, TokenSchema } from 'src/schemas/token.schema'
import { User, UserSchema } from 'src/schemas/auth.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: Token.name, schema: TokenSchema },
            { name: User.name, schema: UserSchema },
        ]),
        MulterModule.register({ dest: './../../tasks/' }),
    ],
    providers: [TasksService, TokenService],
    controllers: [TasksController],
})
export class TasksModule {}
