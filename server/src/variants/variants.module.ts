import { Module } from '@nestjs/common'
import { VariantsService } from './variants.service'
import { VariantsController } from './variants.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from 'src/schemas/task.schema'
import { User, UserSchema } from 'src/schemas/auth.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    exports: [VariantsService],
    controllers: [VariantsController],
    providers: [VariantsService],
})
export class VariantsModule {}
