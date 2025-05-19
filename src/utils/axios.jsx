import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios - API request failed:", error.message);
    return Promise.reject(error);
  }
);

export default instance;


// Example API call to fetch Netflix Originals
// https://api.themoviedb.org/3/discover/tv?api_key=8fe705cf998df51a5fcce0ce095a10a3&with_networks=213