import { Types } from 'mongoose'
import { Task } from 'src/schemas/task.schema'

export class taskDto extends Task {
    _id: Types.ObjectId | undefined
}
