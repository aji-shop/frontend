import axios, { AxiosResponse } from 'axios'

export default class Order {
    static create(token: string, id: string): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8080/orders', {
            token: token,
            id: id,
            // date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    }
}