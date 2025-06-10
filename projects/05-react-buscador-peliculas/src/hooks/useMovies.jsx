
import React, { useCallback } from 'react';
import { useRef, useState, useMemo} from 'react';
import searchMovies from '../services/searchMovies.js';

//import withResults from '../mockups/withresults.js'
import withoutResults from '../mockups/noResults.js'



export  function useMovies({search, sort}){

  const [responseMovies, setResponseMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const previousSearch = useRef(search)



  // Se hace un mapeo de los datos para tener solo un punto
  // de control de los campos que vienen en movies
  // UseCallback es lo mismo que useMemo pero para funciones
 const getMovies = useCallback( async ({search}) =>{

    if (search === previousSearch.current) return
    try{
      console.log('hola desde getMovies')
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const movies = await searchMovies(search);
      if(movies.length > 0) setResponseMovies(movies)
      else setResponseMovies(withoutResults)

    }catch(e){
      setError(e.message)

    }finally{
      setLoading(false)

    }      
  }, [])

  // Aqui se realiza la operación de sort solo si cambia sort o las peliculas
  // De otra forma el hook useMemo conserva su valor
  const sortedMovies = useMemo(() => {


 return  sort    ?[...responseMovies].sort((a,b) => a.title.localeCompare(b.title))
  : responseMovies
  }, [sort, responseMovies])
//locale compare es para comparar con acentos

  return {movies: sortedMovies, getMovies, loading}

  }






