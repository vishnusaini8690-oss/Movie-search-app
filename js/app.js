let TOPMOVIESAPIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
let SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
var container = document.querySelector(".container");
//  var path = "https://image.tmdb.org/t/p/w1280"


async function fetchMovies(API) {
    var response = await fetch(API);
    var data = await response.json();
    showMovies(data.results);
}
fetchMovies(TOPMOVIESAPIURL);

function showMovies(movies) {
    container.innerHTML = "";
    for (let data of movies) {
        console.log(data);
        var path = "https://image.tmdb.org/t/p/w1280" + data.poster_path;
        var div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<img height="350" width="100%" src="${path}" alt="">
            <div class="overview">
            <h2>${data.title}</h2>
            <p>
            <b>Overview:</b>
             ${data.overview}
             </p>
            <span style="color: ${getRatingColor(data.vote_average)}">Rating: ${data.vote_average}</span>
            <span> Release Date: ${data.release_date}</span>
            <span> Language: ${data.original_language}</span>
            <span> Total Votes: ${data.vote_count}</span>
            </div>`;
        container.appendChild(div);
    }
}

function getRatingColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "red";
    } else {
        return "orange";
    }
}


document.querySelector(".input-container input")
    .addEventListener(
        "keyup",
        function (event) {
            var value = event.target.value;
            if (value == "") {
                fetchMovies(TOPMOVIESAPIURL);
            } else {
                fetchMovies(SEARCHAPI + value);
            }
        }
    );