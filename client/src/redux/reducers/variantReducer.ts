import { Reducer } from 'redux'
import {
    ITask,
    IVariantCheckResults,
    VariantActionCreatorTypes,
} from '../../types'

export interface IVariantInitialState {
    currentVariant: Array<ITask>
    variantToken: string
    checkResults: IVariantCheckResults | null
    timer: number
    creationTime: number
    isVariantSaved: boolean
}

const initialState: IVariantInitialState = {
    currentVariant: [],
    variantToken: '',
    checkResults: null,
    creationTime: 0,
    timer: 0,
    isVariantSaved: false,
}

export enum VariantActionTypes {
    GENERATE_VARIANT_API = 'variant/GENERATE_VARIANT_API',
    GENERATE_VARIANT = 'variant/GENERATE_VARIANT',
    GENERATE_VARIANT_WITH_TOKEN = 'variant/GENERATE_VARIANT_WITH_TOKEN',
    RESET_VARIANT = 'variant/RESET_VARIANT',
    SAVE_CURRENT_TIMER = 'variant/SAVE_CURRENT_TIMER',
    CHECK_VARIANT_API = 'variant/CHECK_VARIANT_API',
    CHECK_VARIANT = 'variant/CHECK_VARIANT',
    GET_VARIANT_ANSWERS_API = 'variant/GET_VARIANT_ANSWERS_API',
    GET_VARIANT_ANSWERS = 'variant/GET_VARIANT_ANSWERS',
    SAVE_VARIANT = 'variant/SAVE_VARIANT',
    SET_VARIANT_CHECK_RESULTS = 'variant/SAVE_VARIANT_CHECK_RESULTS',
}

const variantReducer: Reducer<
    IVariantInitialState,
    VariantActionCreatorTypes
> = (
    state = initialState,
    action: VariantActionCreatorTypes
): IVariantInitialState => {
    switch (action.type) {
        case VariantActionTypes.RESET_VARIANT: {
            return {
                ...state,
                currentVariant: initialState.currentVariant,
                timer: initialState.timer,
                checkResults: initialState.checkResults,
                isVariantSaved: initialState.isVariantSaved,
                variantToken: initialState.variantToken,
            }
        }

        case VariantActionTypes.SET_VARIANT_CHECK_RESULTS: {
            return {
                ...state,
                checkResults: action.payload.checkResults,
                isVariantSaved: true,
            }
        }

        case VariantActionTypes.SAVE_VARIANT: {
            return {
                ...state,
                isVariantSaved: true,
            }
        }

        case VariantActionTypes.SAVE_CURRENT_TIMER: {
            return {
                ...state,
                timer: action.payload.timer,
            }
        }

        case VariantActionTypes.GENERATE_VARIANT: {
            return {
                ...state,
                timer: action.payload.timer,
                creationTime: action.payload.creationTime,
                currentVariant: action.payload.tasks,
                variantToken: action.payload.variantToken,
            }
        }

        case VariantActionTypes.CHECK_VARIANT: {
            return {
                ...state,
                checkResults: action.payload.checkResults,
            }
        }

        case VariantActionTypes.GET_VARIANT_ANSWERS: {
            const variant: Array<ITask> = []
            const { answers } = action.payload

            state.currentVariant.forEach((el) => {
                variant.push(el)
                if (el.taskNumber >= 13) {
                    variant[el.taskNumber - 1].answer =
                        answers[el.taskNumber - 13]
                }
            })

            return {
                ...state,
                currentVariant: variant,
            }
        }

        default:
            return state
    }
}

export default variantReducer
