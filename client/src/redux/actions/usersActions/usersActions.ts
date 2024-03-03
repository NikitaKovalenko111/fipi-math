import { UsersActionTypes } from '../../reducers/usersReducer'
import {
    IAuthDto,
    IRegisterDto,
    IUser,
    setFormSubmitting,
    setLoadingType,
    statusHandlerType,
} from '../../../types'
import {
    IAuthorizationAC,
    IAuthorizationApiAC,
    IChangeUsernameAC,
    IChangeUsernameApiAC,
    ICheckAuthAC,
    ILogoutAC,
    IRegisterAC,
    IRemoveUserDataAC,
    ISolveTaskAC,
    ISolveTaskApiAC,
    IUnsolveTaskAC,
    IUnsolveTaskApiAC,
} from './actionsInterfaces'

export const UnsolveTaskAC = (taskId: string): IUnsolveTaskAC => ({
    type: UsersActionTypes.UNSOLVE_TASK,
    payload: {
        taskId: taskId,
    },
})

export const UnsolveTaskApiAC = (
    taskId: string,
    setIsLoading: setLoadingType
): IUnsolveTaskApiAC => ({
    type: UsersActionTypes.UNSOLVE_TASK_API,
    setIsLoading: setIsLoading,
    payload: {
        taskId: taskId,
    },
})

export const ChangeUsernameAC = (username: string): IChangeUsernameAC => ({
    type: UsersActionTypes.CHANGE_USERNAME,
    payload: {
        username: username,
    },
})

export const SolveTaskApiAC = (
    taskId: string,
    setIsLoading: setLoadingType
): ISolveTaskApiAC => ({
    type: UsersActionTypes.SOLVE_TASK_API,
    setIsLoading: setIsLoading,
    payload: {
        taskId: taskId,
    },
})

export const SolveTaskAC = (taskId: string): ISolveTaskAC => ({
    type: UsersActionTypes.SOLVE_TASK,
    payload: {
        taskId: taskId,
    },
})

export const ChangeUsernameApiAC = (
    username: string,
    setIsLoading: setLoadingType
): IChangeUsernameApiAC => ({
    type: UsersActionTypes.CHANGE_USERNAME_API,
    setIsLoading: setIsLoading,
    payload: {
        username: username,
    },
})

export const AuthorizationApiAC = (
    dto: IAuthDto,
    statusHandler: statusHandlerType,
    setSubmitting: (isSubmitting: boolean) => void
): IAuthorizationApiAC => ({
    type: UsersActionTypes.AUTHORIZATION_API,
    setSubmitting: setSubmitting,
    payload: {
        dto: dto,
        statusHandler: statusHandler,
    },
})

export const AuthorizationAC = (user: IUser): IAuthorizationAC => ({
    type: UsersActionTypes.AUTHORIZATION,
    payload: {
        username: user.username,
        email: user.email,
        id: user.id,
        roles: user.roles,
        solvedVariants: user.solvedVariants,
        solvedTasks: user.solvedTasks,
    },
})

export const RemoveUserDataAC = (): IRemoveUserDataAC => ({
    type: UsersActionTypes.DELETE_USER_DATA,
})

export const CheckAuthAC = (setIsLoading: setLoadingType): ICheckAuthAC => ({
    setIsLoading: setIsLoading,
    type: UsersActionTypes.CHECK_AUTH,
})

export const RegisterAC = (
    dto: IRegisterDto,
    statusHandler: statusHandlerType,
    setSubmitting: setFormSubmitting
): IRegisterAC => ({
    type: UsersActionTypes.REGISTER,
    setSubmitting: setSubmitting,
    payload: {
        user: dto,
        statusHandler: statusHandler,
    },
})

export const LogoutAC = (): ILogoutAC => ({
    type: UsersActionTypes.LOGOUT,
})
