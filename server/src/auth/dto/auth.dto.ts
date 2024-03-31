import { Types } from 'mongoose'
import { tokensDtoType } from './token.dto'
import { solvedVariantDto } from 'src/profile/dto/saveVariant.dto'

export class authDtoType {
    username: string
    password: string
    rememberMe: boolean
}

export class tokenPayloadType {
    id: Types.ObjectId
    username: string
}

export class authReturnDtoType {
    user: userReturnDto
    tokens: tokensDtoType
}

export class regDtoType {
    username: string
    password: string
    email: string
}

export class userReturnDto {
    username
    email
    id: Types.ObjectId
    roles
    solvedVariants
    solvedTasks
    ratedTasks

    constructor(user: userDtoType) {
        ;(this.username = user.username),
            (this.email = user.email),
            (this.id = user._id),
            (this.roles = user.roles),
            (this.solvedVariants = user.solvedVariants),
            (this.solvedTasks = user.solvedTasks),
            (this.ratedTasks = user.ratedTasks)
    }
}

export class userDtoType {
    username: string
    email: string
    password: string
    _id: Types.ObjectId
    roles: Array<string>
    solvedVariants: Array<solvedVariantDto>
    solvedTasks: Array<Types.ObjectId>
    ratedTasks: Array<Types.ObjectId>
}
