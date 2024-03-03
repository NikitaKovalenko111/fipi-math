import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { userDtoType, userReturnDto } from 'src/auth/dto/auth.dto'
import { User } from 'src/schemas/auth.schema'
import { ServiceError } from 'src/utils'
import { saveVariantDto } from 'src/profile/dto/saveVariant.dto'

@Injectable()
export default class ProfileService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async deleteUser(userData: userReturnDto): Promise<userReturnDto> {
        try {
            const user: userDtoType = await this.userModel.findByIdAndDelete(
                userData.id,
            )
            const userDto: userReturnDto = new userReturnDto(user)

            return userDto
        } catch (error) {
            throw new ServiceError(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async solveTaskService(
        taskId: Types.ObjectId,
        user: userReturnDto,
    ): Promise<Types.ObjectId> {
        const { id } = user

        const userInDb = await this.userModel.findById(id)

        if (!userInDb) {
            throw new ServiceError(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            )
        }

        if (userInDb.solvedTasks.includes(taskId)) {
            throw new ServiceError('Задание уже решено', HttpStatus.BAD_REQUEST)
        }

        userInDb.solvedTasks.push(taskId)
        const savedUser = await userInDb.save()

        if (!savedUser) {
            throw new ServiceError(
                'Неизвестная ошибка...',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        return taskId
    }

    async unsolveTaskService(
        taskId: Types.ObjectId,
        user: userReturnDto,
    ): Promise<Types.ObjectId> {
        const { id } = user

        const userInDb = await this.userModel.findById(id)

        if (!userInDb) {
            throw new ServiceError(
                'Не найден пользователь',
                HttpStatus.NOT_FOUND,
            )
        }

        userInDb.solvedTasks = userInDb.solvedTasks.filter(
            (elem) => elem !== taskId,
        )

        await userInDb.save()

        return taskId
    }

    async changeUsernameService(
        id: Types.ObjectId,
        newUsername: string,
    ): Promise<userReturnDto> {
        try {
            const user: userDtoType = await this.userModel.findByIdAndUpdate(
                id,
                {
                    username: newUsername,
                },
                {
                    new: true,
                },
            )

            const userDto: userReturnDto = new userReturnDto(user)

            return userDto
        } catch (error) {
            throw new ServiceError(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async saveSolvedVariantService(
        body: saveVariantDto,
    ): Promise<HttpStatus.OK> {
        const { user, solvedVariant } = body

        const { username } = user

        const userInDb = await this.userModel.findOne({ username: username })

        if (user) {
            userInDb.solvedVariants.push(solvedVariant)
            await userInDb.save()
        }

        return HttpStatus.OK
    }
}
