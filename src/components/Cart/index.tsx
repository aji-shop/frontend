import React from 'react'
import { useHistory } from 'react-router-dom'
import {ReactComponent as CartLogo} from './cart.svg'

interface CartProps {
  isAuthed: boolean,
  count:number
}

export default function Cart(props: CartProps) {
    let history = useHistory()

    const handleClick = () => {
        if (props.isAuthed) {
            history.push('/cart')
          } else {
            history.push('/signin')
          }
    }

    return (
      <div className="cart bg-success" onClick={handleClick}>
          <CartLogo />

        {props.count !== 0 ? (
          <div className="count">
            {props.count}
          </div>
        ) : null}
      </div>
    )
}