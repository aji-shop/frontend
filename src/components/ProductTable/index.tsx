import React, {useState, useEffect} from 'react'

import Product, {IProduct} from '../../service/product'
import Category, { ICategory } from '../../service/category'

export interface ProductTableProps {
    handleBuyButtonClick(id: number): void
}

export default function ProductTable(props: ProductTableProps) {

    const [products, setProducts]: [Array<IProduct>, any] = useState([])
    const [categories, setCategories]: [any, any] = useState({})
    const [mounted, setMounted]: [boolean, any] = useState(true)

    useEffect(() => {
        if(mounted) {

            Product.getAll().then(res => {
                setProducts(res.data)
            })

            Category.getAll().then(res => {
                setCategories(
                    res.data.reduce((acc: any, cur: ICategory) => {
                        acc[cur.id] = cur.name

                        return acc
                    }, {})
                )
            })
        }

        return () => {setMounted(false)}
    }, [mounted])
    
    const handleBuyButtonClick = (id: number) => {
        props.handleBuyButtonClick(id)
    }

    return (
        <table className="table table-striped table-hover">
            <thead className="thead thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Category</th>
                    <th scope="col" />
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product: IProduct) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price + '$'}</td>
                            <td>{product.weight}</td>
                            <td>{categories[product.category_id]}</td>
                            <td><button className="btn btn-success" onClick={() => {handleBuyButtonClick(product.id)}}>Kup</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}