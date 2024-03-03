import { AnyAction } from 'redux'
import {
    IActionWithLoader,
    ITask,
    IVariant,
    IVariantCheckResults,
    IVariantInfo,
} from '../../../types'
import { VariantActionTypes } from '../../reducers/variantReducer'

export interface IGenerateVariantAC {
    type: typeof VariantActionTypes.GENERATE_VARIANT
    payload: IVariant
}

export interface IGenerateVariantApiAC extends IActionWithLoader {
    type: typeof VariantActionTypes.GENERATE_VARIANT_API
}

export interface ICheckVariantApiAC extends IActionWithLoader {
    type: typeof VariantActionTypes.CHECK_VARIANT_API
    payload: {
        tasks: Array<ITask>
        answers: Array<number | ''>
    }
}

export interface ISetCheckResultsAC extends AnyAction {
    type: typeof VariantActionTypes.SET_VARIANT_CHECK_RESULTS
    payload: {
        checkResults: IVariantCheckResults
    }
}

export interface ICheckVariantAC {
    type: typeof VariantActionTypes.CHECK_VARIANT
    payload: {
        checkResults: IVariantCheckResults
    }
}

export interface IGetVariantAnswersApiAC extends IActionWithLoader {
    type: typeof VariantActionTypes.GET_VARIANT_ANSWERS_API
    payload: {
        variantToken: string
    }
}

export interface IGetVariantAnswersAC {
    type: typeof VariantActionTypes.GET_VARIANT_ANSWERS
    payload: {
        answers: Array<string>
    }
}

export interface ISaveCurrentTimerAC {
    type: typeof VariantActionTypes.SAVE_CURRENT_TIMER
    payload: {
        timer: number
    }
}

export interface ISaveVariantAC {
    type: typeof VariantActionTypes.SAVE_VARIANT
    payload: IVariantInfo
}

export interface IGenerateVariantWithTokenApiAC extends IActionWithLoader {
    type: typeof VariantActionTypes.GENERATE_VARIANT_WITH_TOKEN
    payload: {
        variantToken: string
    }
}

export interface IResetVariantAC {
    type: typeof VariantActionTypes.RESET_VARIANT
}
