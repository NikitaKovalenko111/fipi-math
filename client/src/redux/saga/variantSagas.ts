import { put, takeLatest } from 'redux-saga/effects'
import { VariantActionTypes } from '../reducers/variantReducer'
import { IVariant, IVariantCheckResults } from '../../types'
import variantAPI from '../../api/variantAPI'
import {
    CheckVariantAC,
    GenerateVariantAC,
    GetVariantAnswersAC,
} from '../actions/variantActions/variantActions'
import {
    ICheckVariantApiAC,
    IGenerateVariantApiAC,
    IGenerateVariantWithTokenApiAC,
    IGetVariantAnswersApiAC,
} from '../actions/variantActions/actionsInterfaces'

export function* generateVariantSagaWatcher() {
    yield takeLatest(
        VariantActionTypes.GENERATE_VARIANT_API,
        generateVariantSagaWorker
    )
}

function* generateVariantSagaWorker(action: IGenerateVariantApiAC) {
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const data: IVariant = yield variantAPI.generate()
        const { tasks, variantToken } = data

        if (!localStorage.getItem('creationTime')) {
            localStorage.setItem('creationTime', String(Date.now()))
        }

        if (!localStorage.getItem('timer')) {
            localStorage.setItem('timer', String(1000 * 60 * 235))
        }

        yield put(
            GenerateVariantAC(
                tasks,
                variantToken,
                Number(localStorage.getItem('creationTime')),
                Number(localStorage.getItem('timer'))
            )
        )

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}

export function* generateVariantWithTokenSagaWatcher() {
    yield takeLatest(
        VariantActionTypes.GENERATE_VARIANT_WITH_TOKEN,
        generateVariantWithTokenSagaWorker
    )
}

function* generateVariantWithTokenSagaWorker(
    action: IGenerateVariantWithTokenApiAC
) {
    const { variantToken } = action.payload
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const data: IVariant = yield variantAPI.generateWithToken(variantToken)
        const { tasks } = data

        if (!localStorage.getItem('creationTime')) {
            localStorage.setItem('creationTime', String(Date.now()))
        }

        if (!localStorage.getItem('timer')) {
            localStorage.setItem('timer', String(1000 * 60 * 235))
        }

        yield put(
            GenerateVariantAC(
                tasks,
                variantToken,
                Number(localStorage.getItem('creationTime')),
                Number(localStorage.getItem('timer'))
            )
        )

        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
}

export function* checkVariantSagaWatcher() {
    yield takeLatest(
        VariantActionTypes.CHECK_VARIANT_API,
        checkVariantSagaWorker
    )
}

function* checkVariantSagaWorker(action: ICheckVariantApiAC) {
    const { tasks, answers } = action.payload
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const data: IVariantCheckResults = yield variantAPI.checkVariant(
            tasks,
            answers
        )

        yield put(CheckVariantAC(data))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}

export function* getVariantAnswersSagaWatcher() {
    yield takeLatest(
        VariantActionTypes.GET_VARIANT_ANSWERS_API,
        getVariantAnswersSagaWorker
    )
}

function* getVariantAnswersSagaWorker(action: IGetVariantAnswersApiAC) {
    const { variantToken } = action.payload
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const answers: Array<string> = yield variantAPI.getVariantAnswers(
            variantToken
        )

        yield put(GetVariantAnswersAC(answers))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}
