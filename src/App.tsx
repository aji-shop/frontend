import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductTable from './components/ProductTable'
import CartView from './components/CartView';
import Auth from './components/Auth'
import AuthView from './components/AuthView';
import Cart from './components/Cart'

import Product, {IProduct} from './service/product'


export default function App() {
  const [list, setList]: [Array<IProduct>, any] = useState([])
  const [token, setToken]: [string, any] = useState('')
  const [user, setUser]: [any, any] = useState(null)

  const contains = (id: number) => {
    for (let product of list) {
        if (product.id === id) {
          return true;
        }
    }
    return false;
  }

  const handleRemove = (id: number) => {
    const newList = list.slice()
    const product = newList.find((item: any) => item.id === id)

    if (product !== undefined) {
      newList.splice(newList.indexOf(product), 1)
      setList(newList)
    }
  }

  const handleConfirm = () => {
    setList([])
  }

  const handleBuyButtonClick = (id: number) => {
    Product.getById(id).then(res => {
      const product: IProduct = res.data;

      if (!contains(id)) {
        setList(list.concat(product))
      }
    })
  }

  const handleAuth = (token: string, user: any) => {
      setToken(token)
      setUser(user)
  }

  const handleLogOut = () => {
    setToken('')
    setUser(null)
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="container-fluid">
            
            <Route path="/home">
              <div className="row">
                <div className="container-fluid header bg-light d-flex justify-content-between align-items-center p-3">
                  <h3>The Best Shop of the World</h3>
                  <div className="d-flex align-items-center">
                    <Auth user={user} handleLogOut={handleLogOut}/>
                    <Cart count={list.length} isAuthed={token !== ''}/>
                  </div>
                </div>
              </div>

              <div className="row">
                <ProductTable handleBuyButtonClick={handleBuyButtonClick}/>
              </div>

              <div className="row">
                Icons made by&nbsp;<a href="http://www.freepik.com/" title="Freepik">Freepik</a>&nbsp;from&nbsp;<a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
              </div>
            </Route>

            <Route path="/cart">
              <CartView 
                token={token}
                list={list.map((item: IProduct) => ({id: item.id, name: item.name, price: item.price}))}
                user={user}
                handleRemove={handleRemove}
                handleConfirm={handleConfirm} />
            </Route>

            <AuthView 
              handleAuth={handleAuth} />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
