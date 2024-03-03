import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { IAuth, IRegisterDto, IUser, IVariantInfo } from '../types'
import store from '../redux/redux-store'
import {
    AuthorizationAC,
    RemoveUserDataAC,
} from '../redux/actions/usersActions/usersActions'

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
    )}`
    return config
})

instance.interceptors.response.use(
    (config) => {
        return config
    },
    async (error: AxiosError) => {
        const status = error.response?.status
        const config = error.config

        if (status === 401) {
            try {
                const data: AxiosResponse<IAuth> = await usersAPI.refreshToken()
                localStorage.setItem(
                    'accessToken',
                    data.data.tokens.accessToken
                )
                store.dispatch(AuthorizationAC(data.data.user))

                if (config) {
                    return instance.request(config)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        localStorage.removeItem('accessToken')
                        store.dispatch(RemoveUserDataAC())
                    }
                }
                return Promise.reject(error)
            }
        } else {
            return Promise.reject(error)
        }
    }
)

interface IUserAPI {
    authorization: (
        username: string,
        password: string,
        rememberMe: boolean
    ) => Promise<AxiosResponse<IAuth>>
    refreshToken: () => Promise<AxiosResponse<IAuth>>
    register: (dto: IRegisterDto) => Promise<AxiosResponse<IAuth>>
    logout: () => Promise<AxiosResponse<number>>
    changeUsername: (username: string) => Promise<AxiosResponse<IUser>>
    saveVariant: (variantInfo: IVariantInfo) => Promise<AxiosResponse<number>>
    saveTask: (taskId: string) => Promise<AxiosResponse<string>>
    unsolveTask: (taskId: string) => Promise<AxiosResponse<string>>
}

const usersAPI: IUserAPI = {
    authorization(username, password, rememberMe) {
        return instance
            .post('/auth', {
                username: username,
                password: password,
                rememberMe: rememberMe,
            })
            .then((data) => data)
    },
    refreshToken() {
        return axios
            .get('/auth/refresh', {
                withCredentials: true,
                baseURL: process.env.REACT_APP_API_PATH,
            })
            .then((data) => data)
    },
    register(dto) {
        const { username, email, password } = dto

        return instance
            .post('/registration', {
                username,
                email,
                password,
            })
            .then((data) => data)
            .catch((err) => Promise.reject(err))
    },
    logout() {
        return instance.delete('/auth/logout')
    },
    changeUsername(username: string) {
        return instance
            .patch('profile/change/username', {
                username,
            })
            .then((data) => data)
    },
    saveVariant(variantInfo) {
        return instance
            .post('profile/save/variant', {
                solvedVariant: variantInfo,
            })
            .then((data) => data)
    },
    saveTask(taskId) {
        return instance
            .post('profile/save/task', {
                taskId,
            })
            .then((data) => data)
    },
    unsolveTask(taskId) {
        return instance
            .delete(`profile/delete/task/${taskId}`)
            .then((data) => data)
    },
}

export default usersAPI
