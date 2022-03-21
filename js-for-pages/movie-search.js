import { encode } from '../utils.js'
import { SERVER } from '../settings.js';

let URL = SERVER + "/api/movies"


export function setupMovieHandlers(){
    document.getElementById("btn-movie-name").onclick = findMovies
}

export function findMovies (){
    let movieName = "query=" + document.getElementById("movie-name").value
    let page = "&page=" + "1";
    let movieSearchURL = URL + "/search?" + movieName + page
    fetch(movieSearchURL)
    .then(res => res.json())
    .then(data => {
        const rows = data["results"].map(movie => `
        <tr>
            <td><img src="https://image.tmdb.org/t/p/w200${encode(movie.poster_path)}"></td>
            <td>${encode(movie.title)}</td>
            <td>${encode(movie.overview)}</td>
            <td>${encode(movie.release_date)}</td>
            <td>${encode(movie.vote_average)}</td>
        </tr>
        `).join("\n")
    
        document.getElementById("movie-detail-rows").innerHTML = rows
    })
    .catch(err => console.error("error: " + err))
    
}
