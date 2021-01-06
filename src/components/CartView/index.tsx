import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Order from '../../service/order'
import List from '../../service/list'

interface ICartProduct {
    id: number, 
    name: string, 
    price: number
}

interface CartViewProps {
    user: {name: string, email: string, phone: string}
    token: string,
    list: Array<ICartProduct>,
    handleRemove(id: number): void,
    handleConfirm(): void
}

export default function CartView(props: CartViewProps) {
    let history = useHistory()

    const [list, setList] = useState(props.list.map((item: ICartProduct) => ({count: 1, ...item})))

    

    const handleQuantityChange = (id: number, isIncrement: boolean) => {
        const newList = list.slice()
        const product = newList.find((item: any) => item.id === id)

        if (product !== undefined) {
            if (isIncrement) {
                product.count++
            } else {
                if (product.count !== 1) {
                    product.count--
                }
            }

            setList(newList)
        }
    }

    const handleRemove = (id: number) => {
        const newList = list.slice()
        const product = newList.find((item: any) => item.id === id)

        if (product !== undefined) {
            props.handleRemove(product.id)
            newList.splice(newList.indexOf(product), 1)
            setList(newList)
        }
    }

    const handleConfirm = () => {
        if (!list.length) {
            return alert('You cannot send empty list')
        }

        const id = ((Math.random()*1000000).toString(16) + Date.now().toString(16)).split('.').join('')
        
        for(let record of list ) {
            List.create(props.token, {
                id: id,
                product_id: record.id,
                count: record.count
            }).then(res => {
                console.log('list', res.data)
            })
        }

        Order.create(props.token, id).then(res => {
            alert(JSON.stringify(res.data))
        })

        setList([])
        props.handleConfirm()
        history.push('/home')
    }

    const handleCancel = () => {
        history.push('/home')
    }

    return (
        <div className="row d-flex justify-content-between">
            <table className="table col-8 table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {list.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price + '$'}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div>{item.count}</div>
                                    <div 
                                        className="btn-group ml-3" 
                                        role="group" 
                                        aria-label="Quantity Controller"
                                    >
                                        <button 
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={() => {handleQuantityChange(item.id,true)}}
                                        >+</button>

                                        <button 
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={() => {handleQuantityChange(item.id, false)}}
                                        >-</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.price*item.count + '$'}
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => {handleRemove(item.id)}}
                                >Usun</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="col-3 bg-dark text-light p-3" style={{position: 'fixed', top: 0, right: 0}}>
                <table className="table-sm">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{props.user.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{props.user.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{props.user.phone}</td>
                        </tr>
                        <tr>
                            <td>Total price</td>
                            <td>{list.reduce((acc: number, curr: any) => acc + curr.price*curr.count, 0) + '$'}</td>
                        </tr>
                    </tbody>
                </table>

                <div 
                    className="btn-group mt-3"
                    role="group" 
                    aria-label="Confirm / Cancel Controller"
                >
                    <button 
                        type="button" 
                        className="btn btn-success"
                        onClick={() => {handleConfirm()}}
                    >Confirm</button>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => {handleCancel()}}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}