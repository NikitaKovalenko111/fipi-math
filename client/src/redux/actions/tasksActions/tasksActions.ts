import { IFilter, IPaginator, ITask, setLoadingType } from '../../../types'
import { ActionTypesList } from '../../reducers/tasksReducer'
import {
    IAddTaskApiAC,
    IChangeFilterValueAC,
    IChangePaginatorValueAC,
    IGetTaskByIdAC,
    IGetTaskByIdApiAC,
    IGetTasksAC,
    IGetTasksApiAC,
} from './actionsInterfaces'

export const getTasksApiAC = (
    page: number,
    pageSize: number,
    setIsLoading: setLoadingType,
    filter?: IFilter
): IGetTasksApiAC => ({
    type: ActionTypesList.GET_TASKS_API,
    setIsLoading: setIsLoading,
    payload: {
        page: page,
        pageSize: pageSize,
        filter: filter,
    },
})

export const getTasksAC = (
    tasks: Array<ITask>,
    total: number
): IGetTasksAC => ({
    type: ActionTypesList.GET_TASKS,
    payload: {
        tasks: tasks,
        total: total,
    },
})

export const changePaginatorValueAC = (
    paginator: IPaginator
): IChangePaginatorValueAC => ({
    type: ActionTypesList.CHANGE_PAGINATOR_VALUE,
    payload: {
        paginator: paginator,
    },
})

export const changeFilterValueAC = (filter: IFilter): IChangeFilterValueAC => ({
    type: ActionTypesList.CHANGE_FILTER_VALUE,
    payload: {
        filter: filter,
    },
})

export const addTaskApiAC = (
    taskNumber: number,
    difficulty: number,
    file: File,
    answer: string,
    setIsLoading: setLoadingType
): IAddTaskApiAC => ({
    type: ActionTypesList.ADD_TASK_API,
    setIsLoading: setIsLoading,
    payload: {
        taskNumber: taskNumber,
        difficulty: difficulty,
        file: file,
        answer: answer,
    },
})

export const getTaskByIdApiAC = (
    id: string,
    setIsLoading: setLoadingType
): IGetTaskByIdApiAC => ({
    type: ActionTypesList.GET_TASK_BY_ID_API,
    setIsLoading: setIsLoading,
    payload: {
        id: id,
    },
})

export const getTaskByIdAC = (task: ITask): IGetTaskByIdAC => ({
    type: ActionTypesList.GET_TASK_BY_ID,
    payload: {
        task: task,
    },
})
