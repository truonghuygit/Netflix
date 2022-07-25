window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
};
const fetchMovies = (url, dom_element, path_type) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .then((data) => {
      console.log(data);
      showMovies(data, dom_element, path_type);
    })
    .catch((err) => console.log(err));
};

const showMovies = (movies, dom_element, path_type) => {
  let moviesElement = document.querySelector(dom_element);
  for (const movie of movies.results) {
    console.log(movie);
    let imgElement = document.createElement("img");
    imgElement.setAttribute("data-id", movie.id);
    imgElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
    moviesElement.appendChild(imgElement);
  }
};

//Original movies
const getOriginals = () => {
  const url =
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetchMovies(url, ".original-movie", "poster_path");
};

//Trending now movies
const getTrendingNow = () => {
  const url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  fetchMovies(url, ".trending-movie", "poster_path");
};

//Top rated movies
const getTopRated = () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  fetchMovies(url, ".top-rated-movie", "poster_path");
};
