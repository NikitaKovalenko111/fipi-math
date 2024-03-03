import { AnyAction } from 'redux'
import { IActionWithLoader, IFilter, IPaginator, ITask } from '../../../types'
import { ActionTypesList } from '../../reducers/tasksReducer'

export interface IAddTaskApiAC extends IActionWithLoader {
    type: typeof ActionTypesList.ADD_TASK_API
    payload: {
        taskNumber: number
        difficulty: number
        file: File
        answer: string
    }
}

export interface IGetTasksApiAC extends IActionWithLoader {
    type: typeof ActionTypesList.GET_TASKS_API
    payload: {
        page: number
        pageSize: number
        filter?: IFilter
    }
}

export interface IGetTasksAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASKS
    payload: {
        tasks: Array<ITask>
        total: number
    }
}

export interface IChangePaginatorValueAC extends AnyAction {
    type: typeof ActionTypesList.CHANGE_PAGINATOR_VALUE
    payload: {
        paginator: IPaginator
    }
}

export interface IChangeFilterValueAC extends AnyAction {
    type: typeof ActionTypesList.CHANGE_FILTER_VALUE
    payload: {
        filter: IFilter
    }
}

export interface IGetTaskByIdApiAC extends IActionWithLoader {
    type: typeof ActionTypesList.GET_TASK_BY_ID_API
    payload: {
        id: string
    }
}

export interface IGetTaskByIdAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASK_BY_ID
    payload: {
        task: ITask
    }
}
