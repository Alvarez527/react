
import {useEffect, useState, useId} from 'react'
import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'
import './Filters.css'

export function Filters({changeFilters}){

    const {filters, setFilters} = useContext(FiltersContext)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()


    const handleChangeMinPrice = (event) =>{

        /*En React, prevState (o "estado anterior") es el valor 
        actual del estado justo antes de que se realice la actualización. 
        Se usa en las funciones de actualización de estado cuando el nuevo 
        estado depende del estado anterior.*/

        setFilters( prevState => ({

            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) =>{

        setFilters( prevState => ({

            ...prevState,
            category: event.target.value
        }))
    }

    return(

        <section className='filters'>

            <div>
                <label htmlFor={minPriceFilterId} >Price</label>
                <input 
                    type='range'
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    value={filters.minPrice}
                    onChange = {handleChangeMinPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value='all'>Todas</option>
                    <option value='beauty'>Beauty</option>
                    <option value='fragrances'>Fragrances</option>
                </select>
            </div>

        </section>
    )


}