import {
    authDtoType,
    authReturnDtoType,
    regDtoType,
    userDtoType,
    userReturnDto,
} from './dto/auth.dto'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/schemas/auth.schema'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Token } from 'src/schemas/token.schema'
import TokenService from './token.service'
import { tokensDtoType } from './dto/token.dto'
import { ServiceError } from 'src/utils'

@Injectable()
export default class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Token.name) private TokenModel: Model<Token>,
        private tokenService: TokenService,
    ) {}

    async authorizationService(
        authDto: authDtoType,
    ): Promise<authReturnDtoType> {
        const user: userDtoType = await this.UserModel.findOne({
            username: authDto.username,
        }).then((el) => {
            if (!el)
                throw new ServiceError(
                    'Пользователя с таким именем не существует',
                    HttpStatus.BAD_REQUEST,
                )
            else return el
        })

        const userDto: userReturnDto = new userReturnDto(user)

        const isPasswordCorrect: boolean = await bcrypt.compare(
            authDto.password,
            user.password,
        )

        if (!isPasswordCorrect)
            throw new ServiceError(
                'Неправильный пароль',
                HttpStatus.BAD_REQUEST,
            )

        const tokens: tokensDtoType = this.tokenService.generateTokens({
            id: userDto.id,
            username: userDto.username,
            rememberMe: authDto.rememberMe,
        })

        const refreshToken = await this.TokenModel.findOne({
            userId: userDto.id,
        })

        if (refreshToken) {
            refreshToken.refreshToken = tokens.refreshToken
            refreshToken.expiresIn = authDto.rememberMe
                ? 45 * 24 * 60 * 60 * 1000
                : 24 * 60 * 60 * 1000

            await refreshToken.save()
        } else {
            await this.TokenModel.create({
                userId: userDto.id,
                refreshToken: tokens.refreshToken,
                expiresIn: authDto.rememberMe
                    ? 45 * 24 * 60 * 60 * 1000
                    : 24 * 60 * 60 * 1000,
            })
        }

        return {
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
            user: userDto,
        }
    }

    async logoutService(refreshToken: string): Promise<typeof HttpStatus.OK> {
        if (!refreshToken) {
            throw new ServiceError(
                'Пользователь не авторизован',
                HttpStatus.UNAUTHORIZED,
            )
        }

        const user: userReturnDto =
            await this.tokenService.validateRefreshToken(refreshToken)

        await this.TokenModel.deleteOne({ userId: user.id })

        return HttpStatus.OK
    }

    async registrationService(
        regDto: regDtoType,
    ): Promise<typeof HttpStatus.CREATED> {
        const user: userDtoType = await this.UserModel.findOne({
            username: regDto.username,
        })

        if (!user) {
            const cryptedPass: string = await bcrypt.hash(regDto.password, 7)

            await this.UserModel.create({
                username: regDto.username,
                password: cryptedPass,
                email: regDto.email,
                roles: ['student'],
            })

            return HttpStatus.CREATED
        } else {
            throw new ServiceError(
                'Пользователь с таким именем уже существует',
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async refreshAccessTokenService(
        refreshToken: string,
    ): Promise<authReturnDtoType> {
        try {
            if (!refreshToken) {
                throw new ServiceError(
                    'Пользователь не авторизован',
                    HttpStatus.UNAUTHORIZED,
                )
            }

            const userData: userReturnDto =
                this.tokenService.validateRefreshToken(refreshToken)
            const tokenFromDb: Token =
                await this.tokenService.findToken(refreshToken)

            if (!userData || !tokenFromDb)
                throw new ServiceError(
                    'Пользователь не авторизован',
                    HttpStatus.UNAUTHORIZED,
                )

            const user: userDtoType = await this.UserModel.findOne({
                username: userData.username,
            })
            const userDto = new userReturnDto(user)
            const accessToken: string = jwt.sign(
                {
                    id: userDto.id,
                    username: userDto.username,
                },
                process.env.JWT_ACCESS_KEY,
            )

            return {
                tokens: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                user: userDto,
            }
        } catch (error) {
            throw new ServiceError(error.message, error.statusCode)
        }
    }
}
