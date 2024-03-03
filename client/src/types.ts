import { AnyAction } from 'redux'
import {
    IAddTaskApiAC,
    IChangeFilterValueAC,
    IChangePaginatorValueAC,
    IGetTaskByIdAC,
    IGetTaskByIdApiAC,
    IGetTasksAC,
    IGetTasksApiAC,
} from './redux/actions/tasksActions/actionsInterfaces'
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
} from './redux/actions/usersActions/actionsInterfaces'
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
} from './redux/actions/variantActions/actionsInterfaces'
import { ITasksInitialState } from './redux/reducers/tasksReducer'
import { IUsersInitialState } from './redux/reducers/usersReducer'
import { IVariantInitialState } from './redux/reducers/variantReducer'

export interface ITask {
    _id: string
    taskNumber: number
    difficulty: number
    fileName: string
    answer: string
}

export type TasksActionCreatorsTypes =
    | IGetTasksApiAC
    | IGetTasksAC
    | IChangePaginatorValueAC
    | IChangeFilterValueAC
    | IGetTaskByIdAC
    | IGetTaskByIdApiAC
    | IAddTaskApiAC

export type UserActionCreatorsTypes =
    | IAuthorizationApiAC
    | IAuthorizationAC
    | IRemoveUserDataAC
    | ICheckAuthAC
    | IRegisterAC
    | ILogoutAC
    | IChangeUsernameAC
    | IChangeUsernameApiAC
    | ISolveTaskAC
    | ISolveTaskApiAC
    | IUnsolveTaskApiAC
    | IUnsolveTaskAC

export type VariantActionCreatorTypes =
    | IGenerateVariantAC
    | IGenerateVariantApiAC
    | ICheckVariantApiAC
    | ICheckVariantAC
    | IGetVariantAnswersApiAC
    | IGetVariantAnswersAC
    | ISaveCurrentTimerAC
    | ISaveVariantAC
    | IGenerateVariantWithTokenApiAC
    | IResetVariantAC
    | ISetCheckResultsAC

export type RootActions = TasksActionCreatorsTypes &
    UserActionCreatorsTypes &
    VariantActionCreatorTypes

export type combinedStateTypes = ITasksInitialState &
    IUsersInitialState &
    IVariantInitialState

export interface IFilter {
    taskNumber?: number
    difficulty?: number
    difficultySort?: string
    isAnswer?: number
    isSolved?: number
    isUnsolved?: number
}

export interface IRegisterDto {
    username: string
    email: string
    password: string
}

export interface IAuthDto {
    username: string
    password: string
    rememberMe: boolean
}

export interface IPaginator {
    page: number
    pageSize: number
}

export interface IUser {
    username: string
    email: string
    id: string
    roles: Array<string>
    solvedTasks: Array<string>
    solvedVariants: Array<IVariantInfo>
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IAuth {
    user: IUser
    tokens: ITokens
}

export interface IStatus {
    statusCode: number
    message: string
}

export interface IVariant {
    tasks: VariantType
    variantToken: string
    creationTime: number
    timer: number
}

export interface IVariantCheckResults {
    primaryPoints: number
    secondaryPoints: number
    answersResult: Array<'correct' | 'incorrect' | number>
}

export interface IVariantInfo {
    variantToken: string
    timer: number
    date: Date
    primaryPoints: number
    secondaryPoints: number
    answers: Array<'correct' | 'incorrect' | number>
}

export interface IActionWithLoader extends AnyAction {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type VariantType = Array<ITask>

export type setLoadingType = React.Dispatch<React.SetStateAction<boolean>>
export type setFormSubmitting = (isSubmitting: boolean) => void

export type statusHandlerType = (status: IStatus) => void
