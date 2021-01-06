import axios, {AxiosResponse} from 'axios'

export default class User {
    static auth(user: {email: string, password: string}): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8080/users/auth/', {
                    email: user.email,
                    password: user.password
        })
    }

    static create(user: {name: string, email: string, phone: string, password: string}): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8080/users', {
            name: user.name, 
            email: user.email, 
            phone: user.phone, 
            password: user.password
        })
    }
}