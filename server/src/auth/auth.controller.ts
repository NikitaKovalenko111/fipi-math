import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res,
} from '@nestjs/common'
import AuthService from './auth.service'
import { authDtoType, authReturnDtoType, regDtoType } from './dto/auth.dto'
import { Request, Response } from 'express'
import { genRefTokenObj } from 'src/utils'
import TokenService from './token.service'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
    ) {}

    @Post('')
    async authorization(
        @Body() authDto: authDtoType,
        @Res({ passthrough: true }) res: Response,
    ): Promise<authReturnDtoType> {
        try {
            const data: authReturnDtoType =
                await this.authService.authorizationService(authDto)

            const tokenInDb = await this.tokenService.findToken(
                data.tokens.refreshToken,
            )

            res.cookie(
                'refreshToken',
                data.tokens.refreshToken,
                genRefTokenObj(tokenInDb.expiresIn),
            )

            return data
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Get('/refresh')
    async refreshAccessToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<authReturnDtoType> {
        try {
            const { refreshToken } = request.cookies

            const authData =
                await this.authService.refreshAccessTokenService(refreshToken)

            return authData
        } catch (error) {
            if (error.statusCode == 401) {
                const { refreshToken } = request.cookies

                if (refreshToken) {
                    const tokenInDb =
                        await this.tokenService.findToken(refreshToken)

                    response.clearCookie(
                        'refreshToken',
                        genRefTokenObj(tokenInDb.expiresIn),
                    )
                }
            }

            throw new HttpException(error.message, error.statusCode)
        }
    }

    @Delete('/logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<number> {
        try {
            const { refreshToken } = req.cookies

            const status: number =
                await this.authService.logoutService(refreshToken)

            const tokenInDb = await this.tokenService.findToken(refreshToken)

            res.clearCookie('refreshToken', genRefTokenObj(tokenInDb.expiresIn))

            return status
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}

@Controller('registration')
export class RegController {
    constructor(private authService: AuthService) {}

    @Post('')
    registration(
        @Body() regDto: regDtoType,
    ): Promise<typeof HttpStatus.CREATED> {
        return this.authService.registrationService(regDto)
    }
}
