import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [error, setError] = useState("");
  const KEY = "9e95aa71";
  useEffect(
    function () {
      callback?.();

      // const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const resp = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!resp.ok) {
            throw new Error(
              "could not fectch movies due to your network connection"
            );
          }
          const data = await resp.json();

          if (data.Response === "False") {
            throw new Error("movie not found");
          }

          setMovies(data.Search);
          setError("");
          // console.log(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
      }
      //   handleCloseMovies();
      fetchMovies();
    },
    [query, callback]
  );

  return { movies, isLoading, error };
}
