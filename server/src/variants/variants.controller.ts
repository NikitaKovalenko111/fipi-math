import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common'
import {
    checkResultsDto,
    checkVariantBodyDto,
    getAnswersBodyDto,
    variantDto,
} from './dto/variant.dto'
import { VariantsService } from './variants.service'

@Controller('/variant')
export class VariantsController {
    constructor(private variantService: VariantsService) {}

    @Get('/generate')
    async generateVariant(): Promise<variantDto> {
        try {
            const variant: variantDto =
                await this.variantService.generateVariantService()

            return variant
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/generate/withtoken')
    async generateVariantWithToken(
        @Body() body: { variantToken: string },
    ): Promise<variantDto> {
        try {
            const { variantToken } = body

            const variant: variantDto =
                await this.variantService.generateVariantWithTokenService(
                    variantToken,
                )

            return variant
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/check')
    async checkVariant(
        @Body() body: checkVariantBodyDto,
    ): Promise<checkResultsDto> {
        try {
            const checkResults: checkResultsDto =
                await this.variantService.checkVariantService(body)

            return checkResults
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/answers')
    async getVariantAnswers(
        @Body() body: getAnswersBodyDto,
    ): Promise<Array<string>> {
        try {
            const { variantToken } = body

            const answers: Array<string> =
                await this.variantService.getVariantAnswersService(variantToken)

            return answers
        } catch (error) {
            console.log(error)
        }
    }
}
