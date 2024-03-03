import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

@Schema()
export class Task {
    @Prop()
    taskNumber: number

    @Prop()
    answer: string

    @Prop()
    difficulty: number

    @Prop()
    fileName: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
