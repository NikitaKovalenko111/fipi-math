import { Task } from 'src/schemas/task.schema'
import { taskDto } from 'src/tasks/dto/task.dto'

export class variantDto {
    tasks: Array<taskDto | Task>
    variantToken: string
}

export class checkVariantBodyDto {
    tasks: Array<taskDto>
    answers: Array<number>
}

export class checkResultsDto {
    answersResult: Array<'correct' | 'incorrect' | number>
    primaryPoints: number
    secondaryPoints: number

    constructor(
        primaryPoints: number,
        secondaryPoints: number,
        answersResults: Array<'correct' | 'incorrect' | number>,
    ) {
        this.answersResult = answersResults
        this.primaryPoints = primaryPoints
        this.secondaryPoints = secondaryPoints
    }
}

export class getAnswersBodyDto {
    variantToken: string
}

export const secondaryPointsTable: Array<number> = [
    6, 11, 17, 22, 27, 34, 40, 46, 52, 58, 64, 66, 68, 70, 72, 74, 76, 78, 80,
    82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 100, 100,
]
