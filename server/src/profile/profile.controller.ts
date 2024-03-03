import {
    Body,
    Controller,
    Delete,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
} from '@nestjs/common'
import { authReturnDtoType, userReturnDto } from 'src/auth/dto/auth.dto'
import ProfileService from './profile.service'
import { changeUsernameBodyDto } from './dto/changeDto.dto'
import { Request, Response } from 'express'
import { tokensDtoType } from 'src/auth/dto/token.dto'
import TokenService from 'src/auth/token.service'
import { genRefTokenObj } from 'src/utils'
import { saveVariantDto } from 'src/profile/dto/saveVariant.dto'
import { solveTaskDto } from './dto/saveTask.dto'
import { Types } from 'mongoose'
import { unsolveTaskDto } from './dto/unsolveTask.dto'

@Controller('/profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private tokenService: TokenService,
    ) {}

    @Delete('/delete')
    deleteUser(@Body() userData: userReturnDto): Promise<userReturnDto> {
        try {
            const user: Promise<userReturnDto> =
                this.profileService.deleteUser(userData)

            return user
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Post('/save/task')
    solveTask(@Body() body: solveTaskDto): Promise<Types.ObjectId> {
        try {
            const { taskId, user } = body

            const solvedTaskId: Promise<Types.ObjectId> =
                this.profileService.solveTaskService(taskId, user)

            return solvedTaskId
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Delete('/delete/task/:taskId')
    unsolveTask(
        @Param('taskId') taskId: Types.ObjectId,
        @Body() body: unsolveTaskDto,
    ): Promise<Types.ObjectId> {
        try {
            const { user } = body

            const solvedTaskId: Promise<Types.ObjectId> =
                this.profileService.unsolveTaskService(taskId, user)

            return solvedTaskId
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Post('/save/variant')
    async saveSolvedVariant(
        @Body() body: saveVariantDto,
    ): Promise<HttpStatus.OK> {
        try {
            const status: number =
                await this.profileService.saveSolvedVariantService(body)

            return status
        } catch (error) {
            if (error.statusCode && error.statusCode === 401) {
                throw new HttpException(error.message, error.statusCode)
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Patch('/change/username')
    async changeUsername(
        @Body() bodyDto: changeUsernameBodyDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<authReturnDtoType> {
        try {
            const { user, username } = bodyDto

            const changedUser: userReturnDto =
                await this.profileService.changeUsernameService(
                    user.id,
                    username,
                )

            const refreshToken: string = req.cookies['refreshToken']

            const tokens: tokensDtoType = this.tokenService.generateTokens({
                id: changedUser.id,
                username: changedUser.username,
                rememberMe: true,
            })

            await this.tokenService.findToken(refreshToken, tokens.refreshToken)

            res.clearCookie(
                'refreshToken',
                genRefTokenObj(45 * 24 * 60 * 60 * 1000),
            )
            res.cookie(
                'refreshToken',
                tokens.refreshToken,
                genRefTokenObj(45 * 24 * 60 * 60 * 1000),
            )

            return {
                tokens: {
                    refreshToken: tokens.refreshToken,
                    accessToken: tokens.accessToken,
                },
                user: changedUser,
            }
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}
