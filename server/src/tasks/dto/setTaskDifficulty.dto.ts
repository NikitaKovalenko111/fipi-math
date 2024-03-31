import { Types } from 'mongoose'
import { userReturnDto } from 'src/auth/dto/auth.dto'

export class setTaskDifficultyDto {
    difficulty: number
    taskId: Types.ObjectId
    user: userReturnDto
}
