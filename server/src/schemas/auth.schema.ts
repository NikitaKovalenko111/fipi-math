import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { solvedVariantDto } from 'src/profile/dto/saveVariant.dto'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({
        unique: true,
        required: true,
    })
    username: string

    @Prop({
        required: true,
    })
    password: string

    @Prop({
        required: true,
        unique: true,
    })
    email: string

    @Prop({
        required: true,
    })
    roles: Array<string>

    @Prop()
    solvedVariants: Array<solvedVariantDto>

    @Prop()
    solvedTasks: Array<Types.ObjectId>

    @Prop()
    ratedTasks: Array<Types.ObjectId>
}

export const UserSchema = SchemaFactory.createForClass(User)
