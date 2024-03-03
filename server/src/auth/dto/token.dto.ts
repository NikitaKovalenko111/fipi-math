import { Types } from 'mongoose'

export class generateTokensDtoType {
    id: Types.ObjectId
    username: string
    rememberMe: boolean
}

export class tokensDtoType {
    refreshToken: string
    accessToken: string
}
