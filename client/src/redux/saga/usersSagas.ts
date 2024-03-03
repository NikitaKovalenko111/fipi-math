import { call, put, takeLatest } from 'redux-saga/effects'
import { UsersActionTypes } from '../reducers/usersReducer'
import {
    AuthorizationAC,
    ChangeUsernameAC,
    RemoveUserDataAC,
    SolveTaskAC,
    UnsolveTaskAC,
} from '../actions/usersActions/usersActions'
import { IAuth } from '../../types'
import usersAPI from '../../api/usersAPI'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { VariantActionTypes } from '../reducers/variantReducer'
import { ISaveVariantAC } from '../actions/variantActions/actionsInterfaces'
import {
    IAuthorizationApiAC,
    IChangeUsernameApiAC,
    ICheckAuthAC,
    IRegisterAC,
    ISolveTaskAC,
    IUnsolveTaskApiAC,
} from '../actions/usersActions/actionsInterfaces'

export function* authorizationSagaWatcher() {
    yield takeLatest(
        UsersActionTypes.AUTHORIZATION_API,
        authorizationSagaWorker
    )
}

function* authorizationSagaWorker(action: IAuthorizationApiAC) {
    const { username, password, rememberMe } = action.payload.dto
    const statusHandler = action.payload.statusHandler
    const { setSubmitting } = action

    try {
        setSubmitting(true)

        const data: AxiosResponse<IAuth> = yield call(
            usersAPI.authorization,
            username,
            password,
            rememberMe
        )

        const { tokens, user } = data.data
        const { status, statusText } = data

        yield localStorage.setItem('accessToken', tokens.accessToken)
        yield put(AuthorizationAC(user))

        setSubmitting(false)

        statusHandler({
            statusCode: status,
            message: statusText,
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            statusHandler({
                statusCode: error.response?.data.statusCode,
                message: error.response?.data.message,
            })
        }

        setSubmitting(false)
    }
}

export function* solveTaskSagaWatcher() {
    yield takeLatest(UsersActionTypes.SOLVE_TASK_API, solveTaskSagaWorker)
}

function* solveTaskSagaWorker(action: ISolveTaskAC) {
    const { setIsLoading } = action
    const { taskId } = action.payload

    try {
        setIsLoading(true)

        const data: AxiosResponse<string> = yield call(
            usersAPI.saveTask,
            taskId
        )

        yield put(SolveTaskAC(data.data))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}

export function* unsolveTaskSagaWatcher() {
    yield takeLatest(UsersActionTypes.UNSOLVE_TASK_API, unsolveTaskSagaWorker)
}

function* unsolveTaskSagaWorker(action: IUnsolveTaskApiAC) {
    const { taskId } = action.payload
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const data: AxiosResponse<string> = yield call(
            usersAPI.unsolveTask,
            taskId
        )

        yield put(UnsolveTaskAC(data.data))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}

export function* logoutSagaWatcher() {
    yield takeLatest(UsersActionTypes.LOGOUT, logoutSagaWorker)
}

function* logoutSagaWorker() {
    try {
        const data: AxiosResponse<number> = yield call(usersAPI.logout)

        if (data.data === 200) {
            yield put(RemoveUserDataAC())

            yield localStorage.removeItem('accessToken')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* checkAuthSagaWatcher() {
    yield takeLatest(UsersActionTypes.CHECK_AUTH, checkAuthSagaWorker)
}

function* checkAuthSagaWorker(action: ICheckAuthAC) {
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const data: AxiosResponse<IAuth> = yield call(usersAPI.refreshToken)

        localStorage.setItem('accessToken', data.data.tokens.accessToken)
        yield put(AuthorizationAC(data.data.user))

        setIsLoading(false)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken')
            }
        } else {
            console.log(error)
        }

        setIsLoading(false)
    }
}

export function* registerSagaWatcher() {
    yield takeLatest(UsersActionTypes.REGISTER, registerSagaWorker)
}

function* registerSagaWorker(action: IRegisterAC) {
    const { statusHandler, user } = action.payload

    const { setSubmitting } = action

    try {
        setSubmitting(true)

        const response: AxiosResponse<IAuth> = yield call(
            usersAPI.register,
            user
        )

        console.log(response)

        yield action.payload.statusHandler({
            statusCode: response.status,
            message: '',
        })

        setSubmitting(false)
    } catch (error) {
        console.log(error)

        if (axios.isAxiosError(error)) {
            statusHandler({
                statusCode: error.response?.data.statusCode,
                message: error.response?.data.message,
            })
        } else {
            console.log(error)
        }

        setSubmitting(false)
    }
}

export function* changeUsernameSagaWatcher() {
    yield takeLatest(
        UsersActionTypes.CHANGE_USERNAME_API,
        changeUsernameSagaWorker
    )
}

function* changeUsernameSagaWorker(action: IChangeUsernameApiAC) {
    const { setIsLoading } = action

    try {
        setIsLoading(true)

        const { username } = action.payload

        const data: AxiosResponse<IAuth> = yield call(
            usersAPI.changeUsername,
            username
        )

        yield localStorage.removeItem('accessToken')
        yield localStorage.setItem('accessToken', data.data.tokens.accessToken)

        yield put(ChangeUsernameAC(username))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}

export function* saveVariantSagaWatcher() {
    yield takeLatest(VariantActionTypes.SAVE_VARIANT, saveVariantSagaWorker)
}

function* saveVariantSagaWorker(action: ISaveVariantAC) {
    try {
        yield call(usersAPI.saveVariant, action.payload)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status !== 401) {
                console.log(error)
            }
        } else {
            console.log(error)
        }
    }
}
