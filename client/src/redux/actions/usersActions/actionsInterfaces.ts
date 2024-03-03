import { AnyAction } from 'redux'
import { UsersActionTypes } from '../../reducers/usersReducer'
import {
    IActionWithLoader,
    IAuthDto,
    IRegisterDto,
    IUser,
    setFormSubmitting,
    statusHandlerType,
} from '../../../types'

export interface IAuthorizationApiAC extends AnyAction {
    type: typeof UsersActionTypes.AUTHORIZATION_API
    setSubmitting: setFormSubmitting
    payload: {
        dto: IAuthDto
        statusHandler: statusHandlerType
    }
}

export interface IAuthorizationAC extends AnyAction {
    type: typeof UsersActionTypes.AUTHORIZATION
    payload: IUser
}

export interface IRemoveUserDataAC extends AnyAction {
    type: typeof UsersActionTypes.DELETE_USER_DATA
}

export interface ICheckAuthAC extends IActionWithLoader {
    type: typeof UsersActionTypes.CHECK_AUTH
}

export interface IRegisterAC extends AnyAction {
    type: typeof UsersActionTypes.REGISTER
    setSubmitting: setFormSubmitting
    payload: {
        user: IRegisterDto
        statusHandler: statusHandlerType
    }
}

export interface ILogoutAC extends AnyAction {
    type: typeof UsersActionTypes.LOGOUT
}

export interface IChangeUsernameApiAC extends IActionWithLoader {
    type: typeof UsersActionTypes.CHANGE_USERNAME_API
    payload: {
        username: string
    }
}

export interface IChangeUsernameAC extends AnyAction {
    type: typeof UsersActionTypes.CHANGE_USERNAME
    payload: {
        username: string
    }
}

export interface ISolveTaskApiAC extends IActionWithLoader {
    type: typeof UsersActionTypes.SOLVE_TASK_API
    payload: {
        taskId: string
    }
}

export interface ISolveTaskAC extends AnyAction {
    type: typeof UsersActionTypes.SOLVE_TASK
    payload: {
        taskId: string
    }
}

export interface IUnsolveTaskApiAC extends IActionWithLoader {
    type: typeof UsersActionTypes.UNSOLVE_TASK_API
    payload: {
        taskId: string
    }
}

export interface IUnsolveTaskAC extends AnyAction {
    type: typeof UsersActionTypes.UNSOLVE_TASK
    payload: {
        taskId: string
    }
}
