import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ITask, IVariant, IVariantCheckResults } from '../types'

const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_PATH}/variant`,
    withCredentials: true,
})

export interface IVariantAPI {
    generate: () => Promise<IVariant>
    generateWithToken: (variantToken: string) => Promise<IVariant>
    checkVariant: (
        tasks: Array<ITask>,
        answers: Array<number | ''>
    ) => Promise<AxiosResponse<IVariantCheckResults>>
    getVariantAnswers: (variantToken: string) => Promise<Array<string>>
}

const variantAPI: IVariantAPI = {
    generate() {
        return instance.get('/generate').then((data) => data.data)
    },

    generateWithToken(variantToken: string) {
        return instance
            .post('/generate/withtoken', {
                variantToken: variantToken,
            })
            .then((data) => data.data)
    },

    checkVariant(tasks, answers) {
        return instance
            .post('/check', {
                tasks: tasks,
                answers: answers,
            })
            .then((data) => data.data)
    },

    getVariantAnswers(variantToken: string) {
        return instance
            .post('/answers', {
                variantToken: variantToken,
            })
            .then((data) => data.data)
    },
}

export default variantAPI
