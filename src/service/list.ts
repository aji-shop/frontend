import axios, { AxiosResponse } from 'axios'

export interface IList {
    id: string,
    product_id: number,
    count: number
}

export default class List {
    static create(token: string, list: IList): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8080/lists', {
            token: token,
            id: list.id,
            product_id: list.product_id,
            count: list.count
        })
    }
}