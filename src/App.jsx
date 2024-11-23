import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (search) => {
    setMovieSearch([]); // Initialize as an empty array, not a string
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=vi&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();

      console.log("dataMovieSearch", data);
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movieSearch); // Corrected logging of movieSearch

  useEffect(() => {
    const fetchApi = async () => {
      // Corrected function name
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
      const url2 =
        "https://api.themoviedb.org/3/tv/top_rated?language=vi&page=1";

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchApi(); // Corrected function call
  }, []);

  console.log(movie);

  return (
    <>
      <div className="bg-black pb-10 relative">
        <Header onSearch={handleSearch} />
        <Banner />
        {movieSearch.length > 0 ? (
          <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} />
        ) : (
          <>
            <MovieList title={"Phim Hot"} data={movie} />
            <MovieList title={"Phim Đề Cử"} data={movieRate} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
