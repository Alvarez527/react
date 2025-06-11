
import {useContext} from 'react'
import './Footer.css'
import { FiltersContext } from '../context/filters'
import {useCart} from '../hooks/useCart'

export function Footer() {

    const {filters} = useContext(FiltersContext)
    const {cart} = useCart()

    return(

        <footer className='footer'>

            <h4>Prueba Tecnica de React ⚛️ React </h4>
           
        </footer>
    )
}