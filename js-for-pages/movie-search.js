import { encode } from '../utils.js'
import { SERVER } from '../settings.js';

let URL = SERVER + "/api/movies"
let currentPage = 1;
let maxpage;
let searchWord

export function setupMovieHandlers(){
    document.getElementById("btn-movie-name").onclick = search
    document.getElementById("next-page").onclick = nextpage
    document.getElementById("previous-page").onclick = previouspage
    document.getElementById("next2-page").onclick = nextpage
    document.getElementById("previous2-page").onclick = previouspage

}

function search(evt){
    evt.preventDefault()
    currentPage = 1
    searchInput()
    findMovies()
}

function findMovies (){
    let movieName = "query=" + searchWord.replace(/\s/g,"+")
    let page = "&page=" + currentPage
    let movieSearchURL = URL + "/search?" + movieName + page
    hideNavigatePageBtn()
    fetch(movieSearchURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
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
        showNavigatePageBtn()
    })
    .catch(err => console.error("error: " + err))

}

function searchInput(){
    searchWord = document.getElementById("movie-name").value
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

function hideNavigatePageBtn(){
    document.getElementById("page-text").classList.add("d-none")
    document.getElementById("page-text2").classList.add("d-none")
    document.getElementById("next-page").classList.add("d-none")
        document.getElementById("previous-page").classList.add("d-none")
        document.getElementById("next2-page").classList.add("d-none")
        document.getElementById("previous2-page").classList.add("d-none")
}

function showNavigatePageBtn(){
        document.getElementById("page-text").classList.remove("d-none")
        document.getElementById("page-text2").classList.remove("d-none")
        document.getElementById("next-page").classList.remove("d-none")
        document.getElementById("previous-page").classList.remove("d-none")
        document.getElementById("next2-page").classList.remove("d-none")
        document.getElementById("previous2-page").classList.remove("d-none")
}

