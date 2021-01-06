import axios, {AxiosResponse} from 'axios'

export interface ICategory {
    id: number,
    name: string
}

export default class Category {
    static getAll(): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/categories')
    }
}