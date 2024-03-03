import { userReturnDto } from 'src/auth/dto/auth.dto'

export class solvedVariantDto {
    variantToken: string
    //difficulty: number
    date: Date
    primaryPoints: number
    secondaryPoints: number
    time: number
    answers: Array<number>
}

export class saveVariantDto {
    solvedVariant: solvedVariantDto
    user: userReturnDto
}
