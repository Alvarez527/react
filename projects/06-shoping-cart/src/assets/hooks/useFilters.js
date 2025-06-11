
import {useState, useContext} from 'react'
import { FiltersContext } from '../context/filters'


export function useFilters() {

  const {filters, setFilters} = useContext(FiltersContext)

  /*const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })*/

  const filterProducts = (products) => {

    return products.filter(product => {

      return(
        product.price >= filters.minPrice && 
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )

    })
  }

  return {filterProducts, setFilters, filters}
}

