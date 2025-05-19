import Row from "../Row/Row";
import requests from "../../../utils/requests";
import "./rowList.css";

console.log("RowList - Imported requests:", requests);

function RowList() {
  if (!requests || !requests.fetchNetflixOriginals) {
    console.error("RowList - Error: requests or fetchNetflixOriginals is undefined");
  }

  return (
    <div className="row-list">
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Row title="TV Shows" fetchUrl={requests.fetchTvShows} />
    </div>
  );
}

export default RowList;