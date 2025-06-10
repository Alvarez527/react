
import './App.css'
import { useEffect, useRef, useState, useCallback, use } from 'react';
import {Movies} from './components/Movies.jsx' 
import {useMovies} from './hooks/useMovies.jsx'
import debounce from 'just-debounce-it'


function useSearch(){
  
  const[search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === '';
      return;
    }

    if(search === ''){
      setError('El campo de busqueda no puede estar vacio'); 
      return
    }

    if(search.match(/^\d+$/)){
      setError('El campo de busqueda no puede contener solo numeros');
      return
    }
    if(search.length < 3){
      setError('El campo de busqueda debe tener al menos 3 caracteres');
      return
    }
    setError(null);
  }, [search]);
  return {search, setSearch, error}
}



function App() {

const[sort, setSort] = useState(false)

const inputRef = useRef();
const {search, setSearch, error} = useSearch();
const {movies, loading, getMovies} = useMovies({search, sort});


const debouncedGetMovies = useCallback( 

  debounce(({search})=>{
  console.log('search', search);
  getMovies({search});
  }, 300)
  
, [getMovies])

// Funcion para retrasar llamados a funciones



const handleSubmit = (event) => {
  //para evitar comportamiento por defecto del formulario
  //que es recargar la pagina
  //y que no se pueda ver el resultado de la busqueda
  event.preventDefault();
  //Forma 1 con inputRef
  //const value = inputRef.current.value;
  //console.log(value);

  //Forma 2 con FormData
  //const data = new FormData(event.target);
  //const query = data.get('query');
  //console.log(query);

  //Forma 3
  //const fields = Object.fromEntries(new FormData(event.target));

  getMovies({search});

}

const handleChange = (event) => {
  const newSearch = event.target.value
  setSearch(newSearch)

  debouncedGetMovies({search: newSearch})
}

const handleSort = () =>{

  setSort(!sort)
}


return(
  <>
  <header>
    <h1>Buscador de Peliculas</h1>
      <div>
    <form className='form' onSubmit={handleSubmit}>
      <input 
      style={{border: error ? '1px solid red' : ''}}
      onChange={handleChange} name='query' value={search} ref={inputRef} placeholder='Avengers, Starwars, The Matrix'/>
      <input type='checkbox' onChange={handleSort} checked={sort}/>
      <button type='submit' >Buscar</button>
      { error && <p style={{color: 'red'}}>{error}</p> }


    </form>
    </div>
  </header>
    <main>
      <Movies movies={movies} />
  </main>
  </>
);

}

export default App
