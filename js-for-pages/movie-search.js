import { encode } from '../utils.js'
import { SERVER } from '../settings.js';

let URL = SERVER + "/api/movies"
let currentPage = 1;
let maxpage;

export function setupMovieHandlers(){
    document.getElementById("btn-movie-name").onclick = search
    document.getElementById("next-page").onclick = nextpage
    document.getElementById("previous-page").onclick = previouspage
    document.getElementById("next2-page").onclick = nextpage
    document.getElementById("previous2-page").onclick = previouspage

}

function search(){
    currentPage = 1
    findMovies()
}

function findMovies (){
    let movieName = "query=" + document.getElementById("movie-name").value
    let page = "&page=" + currentPage
    let movieSearchURL = URL + "/search?" + movieName + page
    fetch(movieSearchURL)
    .then(res => res.json())
    .then(data => {
        maxpage = data.total_pages
        document.getElementById("page-text").innerText = currentPage + " / " + maxpage
        document.getElementById("page-text2").innerText = document.getElementById("page-text").innerText
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
    }).then(()=> {
        document.getElementById("next-page").classList.remove("d-none")
        document.getElementById("previous-page").classList.remove("d-none")
        document.getElementById("next2-page").classList.remove("d-none")
        document.getElementById("previous2-page").classList.remove("d-none")
    })
    .catch(err => console.error("error: " + err))

}

function nextpage(){
    if(currentPage === maxpage){
        return
    }
    currentPage++
    findMovies()
}

function previouspage(){
    if(currentPage === 1){
        return
    }
    currentPage--
    findMovies()
}

