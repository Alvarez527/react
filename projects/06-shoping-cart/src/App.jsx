import  React from 'react'
import {useState, useContext} from 'react'
import { Products } from './assets/components/products.jsx'
import { Header} from './assets/components/Header.jsx'
import {Footer} from './assets/components/Footer.jsx'
import {products as initialProducts} from './mocks/products.json'
import { useFilters } from './assets/hooks/useFilters.js'
import { Cart } from './assets/components/Cart.jsx'
import { CartProvider } from './assets/context/cart.jsx'





function App() {

  const [products] = useState(initialProducts)

  const {filterProducts, setFilters, filters} = useFilters()
  const filteredProducts = filterProducts(products) 


  return(
  <>
  <CartProvider>
    <Header/>
    <Cart/>
    <Products products={filteredProducts}/>
    <Footer/>
  </CartProvider>
  </>
  
  )

}

export default App
