import React from 'react';

function ListOfMovies({movies}){


    return(

         <ul className='movies'>
          {
        movies.map((movie) => (
          <li className='movie' key={movie.imdbID}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
        </ul>

    );
}

function noMovieResults(){
    return(
        <h2>No se encontraron resultados para esta busqueda</h2>
    );
}

export function Movies({movies}){

    const hasMovies = movies && movies.length > 0;

    return(
        hasMovies ? (
            <ListOfMovies movies={movies} />
        ) : (
            noMovieResults()
    ))
}

