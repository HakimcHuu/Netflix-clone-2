const API_KEY = import.meta.env.VITE_API_KEY;

console.log("Requests - API_KEY:", API_KEY);
if (!API_KEY) {
  console.error("Requests - Error: VITE_API_KEY is not defined in .env");
  throw new Error("VITE_API_KEY is required");
}

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTvShows: `/discover/tv?api_key=${API_KEY}&language=en-US&page=1`,
};

console.log("Requests - Requests:", requests);
export default requests;


/*
  Netflix Clone - TMDb API Requests

  This file contains the API requests for fetching data from The Movie Database (TMDb)
  for a Netflix clone application. The requests are structured to retrieve various
  categories of movies and TV shows, including trending content, Netflix originals,
  top-rated movies, and more.

  Each request is constructed using a base URL and specific query parameters,
  including the API key and language settings.
*/
