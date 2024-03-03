import { Controller, Get, HttpException, Param } from '@nestjs/common'
import UsersService from './users.service'
import { Types } from 'mongoose'
import { userDtoType, userReturnDto } from 'src/auth/dto/auth.dto'

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/user/:id')
    getUserById(@Param('id') userId: Types.ObjectId): Promise<userReturnDto> {
        try {
            return this.usersService.getUserByIdService(userId)
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Get('/users')
    getUsers(): Promise<Array<userDtoType>> {
        try {
            return this.usersService.getUsers()
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}
