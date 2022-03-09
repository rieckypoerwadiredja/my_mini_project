const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
    const resp = await fetch(url); // fetch returns a promise
    const respData = await resp.json(); // convert the data to json

    console.log(respData);

    showMovies(respData); // call the function to show the movies

    return respData;
}
getMovies(APIURL);

function showMovies(movies) {
    main.innerHTML = "";

    movies.results.forEach(movie => {
        const {
            poster_path,
            title,
            vote_average,
            overview
        } = movie; // destructuring the object to get the values  

        const movieEl = document.createElement("div"); // create a div element to hold the image and text 

        movieEl.classList.add("movie"); // add a class to the div element

        movieEl.innerHTML =
            `
                <img src="${IMGPATH + poster_path}" alt="${title}">
                
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                
                <div class="overview">
                    <h3>Overview</h3>
                    <span>${overview}</span>
                </div>
                

            `;

        main.appendChild(movieEl); // append the div element to the body

    })
}



function getClassByRate(vote) { // function to get the class by the vote average 
    if (vote >= 7) {
        return "green";
    } else if (vote >= 4) {
        return "orange";
    } else {
        return "red";
    }
} // end of getClassByRate function 

form.addEventListener("submit", e => {
    e.preventDefault(); // prevent the default behaviour of the form  when the user submits it

    const searchTerm = search.value; // get the value of the search input

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm); // call the function to get the movies by the search term

        search.value = ''; // clear the search input
    }


});