import { Reducer } from 'redux'
import {
    TasksActionCreatorsTypes,
    IFilter,
    IPaginator,
    ITask,
} from '../../types'

export interface ITasksInitialState {
    tasks: Array<ITask>
    total: number
    paginator: IPaginator
    filter: IFilter
    currentTask: ITask
}

const initialState: ITasksInitialState = {
    tasks: [],
    total: 0,
    paginator: {
        page: 1,
        pageSize: 10,
    },
    filter: {
        difficulty: undefined,
        taskNumber: undefined,
        difficultySort: '1',
        isAnswer: 0,
        isSolved: 0,
        isUnsolved: 0,
    },
    currentTask: {
        answer: '',
        _id: '',
        taskNumber: 0,
        difficulty: 0,
        fileName: '',
        difficultyMarks: [],
    },
}

export enum ActionTypesList {
    ADD_TASK_API = 'tasks/ADD_TASK_API',
    GET_TASKS_API = 'tasks/GET_TASKS_API',
    GET_TASKS = 'tasks/GET_TASKS',
    CHANGE_PAGINATOR_VALUE = 'tasks/CHANGE_PAGINATOR_VALUE',
    CHANGE_FILTER_VALUE = 'tasks/CHANGE_FILTER_VALUE',
    GET_TASK_BY_ID_API = 'tasks/GET_TASK_BY_ID_API',
    GET_TASK_BY_ID = 'tasks/GET_TASK_BY_ID',
    RATE_TASK_API = 'tasks/RATE_TASK_API',
    RATE_TASK = 'tasks/RATE_TASK',
}

const tasksReducer: Reducer<ITasksInitialState, TasksActionCreatorsTypes> = (
    state: ITasksInitialState = initialState,
    action: TasksActionCreatorsTypes
): ITasksInitialState => {
    switch (action.type) {
        case ActionTypesList.GET_TASKS: {
            return {
                ...state,
                tasks: action.payload.tasks,
                total: action.payload.total,
            }
        }

        case ActionTypesList.CHANGE_PAGINATOR_VALUE: {
            return { ...state, paginator: { ...action.payload.paginator } }
        }

        case ActionTypesList.CHANGE_FILTER_VALUE: {
            return { ...state, filter: { ...action.payload.filter } }
        }

        case ActionTypesList.GET_TASK_BY_ID: {
            return { ...state, currentTask: action.payload.task }
        }

        case ActionTypesList.RATE_TASK: {
            const { _id } = action.payload.task
            const { task } = action.payload

            const index: number = state.tasks.findIndex((el) => el._id === _id)

            return {
                ...state,
                tasks: [
                    ...state.tasks.slice(0, index),
                    task,
                    ...state.tasks.slice(index + 1),
                ],
            }
        }

        default:
            return state
    }
}

export default tasksReducer
