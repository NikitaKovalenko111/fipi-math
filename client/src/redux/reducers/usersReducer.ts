import { Reducer } from 'redux'
import { IUser, UserActionCreatorsTypes } from '../../types'

export interface IUsersInitialState {
    currentUser: IUser
    isAuthorized: boolean
    users: Array<IUser>
}

const initialState: IUsersInitialState = {
    currentUser: {
        username: '',
        email: '',
        id: '',
        roles: [],
        solvedTasks: [],
        solvedVariants: [],
        ratedTasks: [],
    },
    isAuthorized: false,
    users: [],
}

export enum UsersActionTypes {
    AUTHORIZATION_API = 'users/AUTHORIZATION_API',
    AUTHORIZATION = 'users/AUTHORIZATION',
    DELETE_USER_DATA = 'users/DELETE_USER_DATA',
    CHECK_AUTH = 'users/CHECK_AUTH',
    REGISTER = 'users/REGISTER',
    LOGOUT = 'users/LOGOUT',
    CHANGE_USERNAME = 'users/CHANGE_USERNAME',
    CHANGE_USERNAME_API = 'users/CHANGE_USERNAME_API',
    SOLVE_TASK_API = 'users/SOLVE_TASK_API',
    SOLVE_TASK = 'users/SOLVE_TASK',
    UNSOLVE_TASK_API = 'users/UNSOLVE_TASK_API',
    UNSOLVE_TASK = 'users/UNSOLVE_TASK',
    RATE_TASK = 'users/RATE_TASK',
}

const usersReducer: Reducer<IUsersInitialState, UserActionCreatorsTypes> = (
    state: IUsersInitialState = initialState,
    action: UserActionCreatorsTypes
): IUsersInitialState => {
    switch (action.type) {
        case UsersActionTypes.AUTHORIZATION: {
            return { ...state, currentUser: action.payload, isAuthorized: true }
        }

        case UsersActionTypes.UNSOLVE_TASK: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    solvedTasks: state.currentUser.solvedTasks.filter(
                        (elem) => elem !== action.payload.taskId
                    ),
                },
            }
        }

        case UsersActionTypes.DELETE_USER_DATA: {
            return {
                ...state,
                currentUser: initialState.currentUser,
                isAuthorized: false,
            }
        }

        case UsersActionTypes.CHANGE_USERNAME: {
            return {
                ...state,
                currentUser: {
                    email: state.currentUser.email,
                    id: state.currentUser.id,
                    username: action.payload.username,
                    roles: state.currentUser.roles,
                    solvedTasks: state.currentUser.solvedTasks,
                    solvedVariants: state.currentUser.solvedVariants,
                    ratedTasks: state.currentUser.ratedTasks,
                },
            }
        }

        case UsersActionTypes.SOLVE_TASK: {
            if (state.currentUser.solvedTasks.includes(action.payload.taskId)) {
                return state
            }
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    solvedTasks: [
                        ...state.currentUser.solvedTasks.slice(
                            0,
                            state.currentUser.solvedTasks.length
                        ),
                        action.payload.taskId,
                    ],
                },
            }
        }

        case UsersActionTypes.RATE_TASK: {
            const { taskId } = action.payload

            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ratedTasks: [
                        ...state.currentUser.ratedTasks.slice(0),
                        taskId,
                    ],
                },
            }
        }

        default:
            return state
    }
}

export default usersReducer
