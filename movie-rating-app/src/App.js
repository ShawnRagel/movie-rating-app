import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});

  // search movie
  const searchMovies = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=thewdb&s=${query}`
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log("Error in fetching Movie:", error);
    }
  };

  // search movie on enter
  const searchOnEnter = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  // add ratings

  const rateMovie = (imdbID, rating) => {
    setRatings((prev) => ({
      ...prev,
      [imdbID]: rating,
    }));
  };

  return (
    <div>
      <h1>🎬 Bubble Movie Rating App</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movie Name"
          onKeyDown={searchOnEnter}
        ></input>
        <button onClick={searchMovies}>Search Movie</button>
      </div>
      <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                {movie.Poster !== "N/A" && (
                  <img src={movie.Poster} alt={movie.Title}></img>
                )}
                <div>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((point) => (
                    <span
                      key={point}
                      style={{
                        cursor: "pointer",
                        color:
                          point <= (ratings[movie.imdbID] || 0)
                            ? "gold"
                            : "gray",
                        fontSize: "1.3rem",
                        marginRight: "3px",
                      }}
                      onClick={() => rateMovie(movie.imdbID, point)}
                    >
                      ●
                    </span>
                  ))}
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "0.9rem",
                      color: "#ccc",
                    }}
                  >
                    {ratings[movie.imdbID]
                      ? `${ratings[movie.imdbID]}/10`
                      : "Unrated"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>no movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
