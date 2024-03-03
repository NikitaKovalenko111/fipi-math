import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { userDtoType, userReturnDto } from 'src/auth/dto/auth.dto'
import { User } from 'src/schemas/auth.schema'

@Injectable()
export default class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserByIdService(id: Types.ObjectId): Promise<userReturnDto> {
        const user: userDtoType = await this.userModel.findById(id)
        const userDto: userReturnDto = new userReturnDto(user)

        return userDto
    }

    async getUsers(): Promise<Array<userDtoType>> {
        const users: Array<userDtoType> = await this.userModel.find()

        return users
    }
}
