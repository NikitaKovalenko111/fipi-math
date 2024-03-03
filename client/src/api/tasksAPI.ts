import axios, { AxiosResponse } from 'axios'
import { IFilter, ITask } from '../types'
import queryString from 'query-string'

export interface IResponseGetTasks {
    tasks: Array<ITask>
    total: number
}

interface ITasksAPI {
    getTasks: (
        page: number,
        pageSize: number,
        filter?: IFilter
    ) => Promise<AxiosResponse<IResponseGetTasks>>
    postTask: (formData: FormData) => Promise<AxiosResponse<FormData>>
    getTaskById: (id: string) => Promise<AxiosResponse<ITask>>
}

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_PATH}/tasks`,
})

const instanceWithAuth = axios.create({
    baseURL: `${process.env.REACT_APP_API_PATH}/tasks`,
})

instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
    )}`
    return config
})

const tasksAPI: ITasksAPI = {
    getTasks(page, pageSize, filter) {
        const queryFilter: string = filter ? queryString.stringify(filter) : ''

        return instanceWithAuth
            .get(`?page=${page}&pageSize=${pageSize}&${queryFilter}`)
            .then((data) => data.data)
    },
    getTaskById(id) {
        return axiosInstance.get(`/${id}`).then((data) => data.data)
    },
    postTask(formData) {
        return axiosInstance.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}

export default tasksAPI
