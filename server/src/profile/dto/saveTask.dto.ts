import { Types } from 'mongoose'
import { userReturnDto } from 'src/auth/dto/auth.dto'

export class solveTaskDto {
    taskId: Types.ObjectId
    user: userReturnDto
}
