import { HttpStatus, Injectable } from '@nestjs/common'
import { tokenPayloadType, userDtoType, userReturnDto } from './dto/auth.dto'
import * as jwt from 'jsonwebtoken'
import { generateTokensDtoType, tokensDtoType } from './dto/token.dto'
import { Token } from 'src/schemas/token.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ServiceError } from 'src/utils'

@Injectable()
export default class TokenService {
    constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

    validateAccessToken(accessToken: string): userReturnDto {
        if (!accessToken)
            throw new ServiceError(
                'Пользователь не авторизован',
                HttpStatus.UNAUTHORIZED,
            )

        let userData: string | jwt.JwtPayload

        jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_KEY,
            function (err, decoded) {
                if (err) {
                    throw new ServiceError(
                        'Пользователь не авторизован',
                        HttpStatus.UNAUTHORIZED,
                    )
                }

                userData = decoded
            },
        )

        return userData as userReturnDto
    }

    validateRefreshToken(refreshToken: string): userReturnDto {
        if (!refreshToken)
            throw new ServiceError(
                'Пользователь не авторизован',
                HttpStatus.UNAUTHORIZED,
            )

        let userData: jwt.JwtPayload | string

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_KEY,
            function (err, decoded) {
                if (err) {
                    throw new ServiceError(
                        'Пользователь не авторизован',
                        HttpStatus.UNAUTHORIZED,
                    )
                }

                userData = decoded
            },
        )

        const userDto = new userReturnDto(userData as userDtoType)

        return userDto
    }

    generateTokens(data: generateTokensDtoType): tokensDtoType {
        const expiresIn: string = data.rememberMe ? '45d' : '1d'
        const tokenPayload: tokenPayloadType = {
            id: data.id,
            username: data.username,
        }

        const refreshToken: string = jwt.sign(
            tokenPayload,
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: expiresIn,
            },
        )
        const accessToken: string = jwt.sign(
            tokenPayload,
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '30m',
            },
        )

        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
        }
    }

    async findToken(token: string, changeToken?: string): Promise<Token> {
        const tokenFromDb = await this.tokenModel.findOne({
            refreshToken: token,
        })

        if (changeToken) {
            tokenFromDb.refreshToken = changeToken

            await tokenFromDb.save()
        }

        return tokenFromDb
    }
}
