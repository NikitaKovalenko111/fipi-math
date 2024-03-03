import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type TokenDocument = HydratedDocument<Token>

@Schema()
export class Token {
    @Prop({
        required: true,
    })
    refreshToken: string

    @Prop({
        required: true,
    })
    expiresIn: number

    @Prop({
        required: true,
        ref: 'User',
    })
    userId: Types.ObjectId
}

export const TokenSchema = SchemaFactory.createForClass(Token)
