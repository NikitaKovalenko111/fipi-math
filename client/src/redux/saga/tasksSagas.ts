import { ITask } from './../../types'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ActionTypesList } from '../reducers/tasksReducer'
import { IPaginator } from '../../types'
import tasksAPI, { IResponseGetTasks } from '../../api/tasksAPI'
import {
    getTasksAC,
    getTasksApiAC,
    getTaskByIdAC,
} from '../actions/tasksActions/tasksActions'
import { paginatorSelector } from '../../selectors/tasksSelectors'
import {
    IAddTaskApiAC,
    IGetTaskByIdApiAC,
    IGetTasksApiAC,
} from '../actions/tasksActions/actionsInterfaces'

export function* addTaskSagaWatcher() {
    yield takeLatest(ActionTypesList.ADD_TASK_API, addTaskSagaWorker)
}

function* addTaskSagaWorker(action: IAddTaskApiAC) {
    const formData: FormData = new FormData()

    const { taskNumber, difficulty, answer, file } = action.payload
    const { setIsLoading } = action

    formData.append('taskNumber', String(taskNumber))
    formData.append('difficulty', String(difficulty))
    formData.append('answer', String(answer))
    formData.append('taskImage', file)

    yield tasksAPI.postTask(formData)

    const paginator: IPaginator = yield select(paginatorSelector)

    yield put(getTasksApiAC(paginator.page, paginator.pageSize, setIsLoading))
}

export function* getTasksSagaWatcher() {
    yield takeLatest(ActionTypesList.GET_TASKS_API, getTasksSagaWorker)
}

function* getTasksSagaWorker(action: IGetTasksApiAC) {
    const { setIsLoading } = action
    const { page, pageSize, filter } = action.payload

    yield setIsLoading(true)

    const data: IResponseGetTasks = yield tasksAPI.getTasks(
        page,
        pageSize,
        filter
    )

    yield put(getTasksAC(data.tasks, data.total))

    yield setIsLoading(false)
}

export function* getTaskByIdSagaWatcher() {
    yield takeLatest(ActionTypesList.GET_TASK_BY_ID_API, getTaskByIdSagaWorker)
}

function* getTaskByIdSagaWorker(action: IGetTaskByIdApiAC) {
    const { setIsLoading } = action
    const { id } = action.payload

    try {
        setIsLoading(true)

        const data: ITask = yield call(tasksAPI.getTaskById, id)

        yield put(getTaskByIdAC(data))

        setIsLoading(false)
    } catch (error) {
        console.log(error)

        setIsLoading(false)
    }
}
