upcoming();
popular();
topRated();
genreList();
    
    async function genreList() {
        try {
            const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=099030c469492bfd07f8012773a7f0fb";

            const response = await fetch(url);

            if (!response.ok) {
            throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const datalist = document.getElementById("dynamicGenres");

            datalist.innerHTML = ''; // clear existing entries

            json.genres.forEach(genre => {
                const option = document.createElement("option");
                option.id = genre.id;
                option.value = genre.name;
                datalist.append(option);
            });

        } catch(error) {
            console.error("Genre API:", error);
        }
    }

    async function upcoming() {
        try {
            const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=099030c469492bfd07f8012773a7f0fb";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const list = json.results;

            const upcomingMoviesPH = document.getElementById("upcomingMoviesPH");

            const upcomingMoviesPagi = document.getElementById("upcomingMoviesPagi");

            upcomingMoviesPH.innerHTML = ""; //clear existing entries

            upcomingMoviesPagi.innerHTML = ""; //clear existing entries

            list.forEach((movie, index) => {
                const pagi = 
                `<li>
                    <a href="#" onclick="movieDisplay(${index})">${index + 1}</a>
                </li>`;
                const movies = 
                `<li>
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="Movie Poster">
                    <h3>${movie.title}</h3>
                    <p><b>Release Date: </b>${movie.release_date}</p>
                    <p><b>Overview: </b>${movie.overview}</p>
                </li>`;
                upcomingMoviesPH.innerHTML += movies;
                upcomingMoviesPagi.innerHTML += pagi;
            })
            movieDisplay(0)
        } catch(error) {
            console.error("Upcoming API:", error);
        }
    }

    async function topRated() {
        try {
            const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=099030c469492bfd07f8012773a7f0fb";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const list = json.results;

            const topRatedTableBody = document.getElementById("topRatedMoviesTableBody");

            topRatedTableBody.innerHTML = ""; //clear existing entries

            list.forEach((movie, index) => {
                const topRatedMoviesTableRow = 
                `<tr>
                    <td>${index + 1}</td>
                    <td><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="100px" height="150px" alt="Movie Poster"></td>
                    <td>${movie.title}</td>
                    <td class="hide">${movie.overview}</td>
                    <td class="switch">${movie.vote_average}</td>
                </tr>`;
                topRatedTableBody.innerHTML += topRatedMoviesTableRow;
            });
        } catch(error) {
            console.error("TopRated API:", error);
        }
    }

    async function popular() {
        try {
            const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=099030c469492bfd07f8012773a7f0fb";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const list = json.results;

            const popularTableBody = document.getElementById("popularMoviesTableBody");

            popularTableBody.innerHTML = ""; //clear existing entries

            list.forEach((movie, index) => {
                const popularMoviesTableRow = 
                `<tr>
                    <td>${index + 1}</td>
                    <td><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="100px" height="150px" alt="Movie Poster"></td>
                    <td>${movie.title}</td>
                    <td class="hide">${movie.overview}</td>
                    <td class="switch">${movie.vote_count}</td>
                </tr>`;
                popularTableBody.innerHTML += popularMoviesTableRow;
            });
        } catch(error) {
            console.error("Popular API:", error);
        }
    }

    function search() {
        const option = document.getElementById("searchBy").value;

        if(option == "Movie Title") {
            searchTitle()
        }
        else {
            searchPerson()
        };
    }

    async function searchTitle() {
        try {
            const searchInput = document.getElementById("searchInput").value;

            const updatedSearchInput = searchInput.replace(/ /g, "%20");

            const url = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=099030c469492bfd07f8012773a7f0fb&query=" + updatedSearchInput;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const list = json.results;

            const searchMovieTitle = document.getElementById("searchResultsPh");

            searchMovieTitle.innerHTML = ""; //clear existing entries

            list.forEach((movie) => {
                const searchResult = 
                `<li>
                    <img 
                        src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
                        width="100px" 
                        height="150px"
                        alt="Movie Poster"
                    >
                    <h3>${movie.title}</h3>
                    <p>
                        <b>Release Date: </b>${movie.release_date}<br>
                        <b>Rating: </b>${movie.vote_average}<br>
                        <b>Overview: </b>${movie.overview}}
                    </p>
                </li>`;
            searchMovieTitle.innerHTML += searchResult;
            });
        } catch(error) {
            console.error("SearchTitle API:", error);
        }
    }

    async function searchPerson() {
        try {
            const searchInput = document.getElementById("searchInput").value

            const updatedSearchInput = searchInput.replace(/ /g, "%20")

            const url = "https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&api_key=099030c469492bfd07f8012773a7f0fb&query=" + updatedSearchInput;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP error" + response.status);  
            }

            const json = await response.json();

            const list = json.results;

            const searchPerson = document.getElementById("searchResultsPh");

            searchPerson.innerHTML = ""; //clear existing entries

            list.forEach((person) => {
                const movies = person.known_for;

                movies.forEach((movie) => {
                    const searchResult = 
                    `<li>
                        <img 
                            src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
                            width="100px" 
                            height="150px"
                            alt="Movie Poster"
                        >
                        <h3>${movie.title}</h3>
                        <p>
                            <b>Release Date: </b>${movie.release_date}<br>
                            <b>Rating: </b>${movie.vote_average}<br>
                            <b>Overview: </b>${movie.overview}}
                        </p>
                    </li>`;
                    searchPerson.innerHTML += searchResult;
                });
            });
        } catch(error) {
            console.error("SearchPerson API:", error);
        }
    }

    function movieDisplay(index) {
        const movies = document.querySelectorAll(".upcomingMovies li");

        movies.forEach(movie => {
            movie.style.display = "none";
        });

        movies[index].style.display = "block";
    }