import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/auth.schema'
import { ProfileController } from './profile.controller'
import ProfileService from './profile.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
    ],
    providers: [ProfileService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export default class ProfileModule {}
