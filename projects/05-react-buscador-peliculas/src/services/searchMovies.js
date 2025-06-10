const API_KEY = '5b04b5b3';
//const URL = 'http://www.omdbapi.com/?apikey=[yourkey]&';
const URL = 'http://www.omdbapi.com/?apikey=';


const searchMovies = (search) => {

if (search === ' ') return;

 return ( fetch(`${URL}${API_KEY}&s=${search}`)
        .then(response => response.json())
        .then(data => {
            if(data.Response === 'True'){
                const movies = data.Search.map(movie => ({
                    title: movie.Title,
                    year: movie.Year,
                    imdbID: movie.imdbID,
                    type: movie.Type,
                    poster: movie.Poster
                }));
            
            return movies;

     }else {
                return [];
            } 
        }  
    )

)

}

    export default searchMovies;