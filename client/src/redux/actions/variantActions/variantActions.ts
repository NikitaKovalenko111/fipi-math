import { VariantActionTypes } from '../../reducers/variantReducer'
import {
    ITask,
    IVariantCheckResults,
    IVariantInfo,
    VariantType,
    setLoadingType,
} from '../../../types'
import {
    ICheckVariantAC,
    ICheckVariantApiAC,
    IGenerateVariantAC,
    IGenerateVariantApiAC,
    IGenerateVariantWithTokenApiAC,
    IGetVariantAnswersAC,
    IGetVariantAnswersApiAC,
    IResetVariantAC,
    ISaveCurrentTimerAC,
    ISaveVariantAC,
    ISetCheckResultsAC,
} from './actionsInterfaces'

export const ResetVariantAC = (): IResetVariantAC => ({
    type: VariantActionTypes.RESET_VARIANT,
})

export const SaveVariantAC = (variantInfo: IVariantInfo): ISaveVariantAC => ({
    type: VariantActionTypes.SAVE_VARIANT,
    payload: variantInfo,
})

export const GenerateVariantApi = (
    setIsLoading: setLoadingType
): IGenerateVariantApiAC => ({
    setIsLoading: setIsLoading,
    type: VariantActionTypes.GENERATE_VARIANT_API,
})

export const GenerateVariantWithTokenApi = (
    variantToken: string,
    setIsLoading: setLoadingType
): IGenerateVariantWithTokenApiAC => ({
    type: VariantActionTypes.GENERATE_VARIANT_WITH_TOKEN,
    setIsLoading: setIsLoading,
    payload: {
        variantToken: variantToken,
    },
})

export const SaveCurrentTimerAC = (timer: number): ISaveCurrentTimerAC => ({
    type: VariantActionTypes.SAVE_CURRENT_TIMER,
    payload: {
        timer: timer,
    },
})

export const GetVariantAnswersApiAC = (
    variantToken: string,
    setIsLoading: setLoadingType
): IGetVariantAnswersApiAC => ({
    type: VariantActionTypes.GET_VARIANT_ANSWERS_API,
    setIsLoading: setIsLoading,
    payload: {
        variantToken: variantToken,
    },
})

export const GetVariantAnswersAC = (
    answers: Array<string>
): IGetVariantAnswersAC => ({
    type: VariantActionTypes.GET_VARIANT_ANSWERS,
    payload: {
        answers: answers,
    },
})

export const GenerateVariantAC = (
    variant: VariantType,
    token: string,
    creationTime: number,
    timer: number
): IGenerateVariantAC => ({
    type: VariantActionTypes.GENERATE_VARIANT,
    payload: {
        tasks: variant,
        variantToken: token,
        creationTime: creationTime,
        timer: timer,
    },
})

export const CheckVariantApiAC = (
    tasks: Array<ITask>,
    answers: Array<number | ''>,
    setIsLoading: setLoadingType
): ICheckVariantApiAC => ({
    type: VariantActionTypes.CHECK_VARIANT_API,
    setIsLoading: setIsLoading,
    payload: {
        tasks: tasks,
        answers: answers,
    },
})

export const CheckVariantAC = (
    checkResults: IVariantCheckResults
): ICheckVariantAC => ({
    type: VariantActionTypes.CHECK_VARIANT,
    payload: {
        checkResults: checkResults,
    },
})

export const SetCheckResultsAC = (
    checkResults: IVariantCheckResults
): ISetCheckResultsAC => ({
    type: VariantActionTypes.SET_VARIANT_CHECK_RESULTS,
    payload: {
        checkResults: checkResults,
    },
})
