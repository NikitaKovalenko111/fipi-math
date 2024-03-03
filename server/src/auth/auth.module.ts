import { Module } from '@nestjs/common'
import { AuthController, RegController } from './auth.controller'
import AuthService from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/auth.schema'
import { Token, TokenSchema } from 'src/schemas/token.schema'
import TokenService from './token.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Token.name, schema: TokenSchema },
        ]),
    ],
    controllers: [AuthController, RegController],
    providers: [AuthService, TokenService],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
