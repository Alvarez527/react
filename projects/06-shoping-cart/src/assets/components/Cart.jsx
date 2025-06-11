
import './Cart.css'
import {CartIcon, ClearCartIcon, RemoveFromCartIcon} from './icons.jsx'
import { useId } from 'react'
import { useCart } from '../hooks/useCart.js'



function CartItem({thumbnail, price, title, quantity, addToCart}){


    return (

         <li>
                    <img 
                        src={thumbnail}
                        alt={title}
                    />
                    <div>
                        <strong>{title}</strong>  - ${price}
                    </div>
                    <footer>
                        <small>
                            {`Quantity: ${quantity}`}
                        </small>
                        <button onClick={addToCart}>+</button>
                    </footer>
         </li>

    )
}


export function Cart (){

    const cartCheckboxId = useId()

    const {cart, clearCart, addToCart} = useCart()


    return(

        <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
            <CartIcon/>
        
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
        <aside className='cart'>
            <ul>
               {cart.map(product =>{

                return(

                <CartItem 
                key={product.id} 
                addToCart = {() => addToCart(product)}
                {...product}
                />)
               })}
            </ul>
            <button onClick={clearCart}>
                <ClearCartIcon/>
            </button>
        </aside>
        </>
    )
}