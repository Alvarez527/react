

import {createContext, useReducer} from 'react';
import { cartReducer } from '../reducers/cart';
import { cartInitialState } from '../reducers/cart';

export const CartContext = createContext()

const initialState = [];

function useCartReducer(){


    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({

        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({

        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({

        type: 'CLEAR_CART'
    })

    return {addToCart,  removeFromCart, clearCart, state}

}



export function CartProvider({children}){

    const {state, addToCart, removeFromCart, clearCart} = useCartReducer()


    return(

        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )


}

