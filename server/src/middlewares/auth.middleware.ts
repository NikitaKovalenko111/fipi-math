import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { userReturnDto } from 'src/auth/dto/auth.dto'
import TokenService from 'src/auth/token.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private tokenService: TokenService) {}

    use(req: Request, res: Response, next: NextFunction): void {
        try {
            const accessToken: string = req.headers.authorization.split(' ')[1]

            if (!accessToken) {
                next(HttpStatus.UNAUTHORIZED)
            }

            const userData: userReturnDto =
                this.tokenService.validateAccessToken(accessToken)
            if (!userData) {
                next(HttpStatus.UNAUTHORIZED)
            }

            req.body.user = userData

            next()
        } catch (error) {
            return next(new HttpException(error.message, error.statusCode))
        }
    }
}

export default AuthMiddleware
