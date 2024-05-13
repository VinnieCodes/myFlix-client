import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch("https://movieflixer-b13bdd05bf25.herokuapp.com/movies", {
      headers: {
        Authorization:
          "Bearer " +
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyNzcxMzZkOTgyNTRkOWI2MzcyMTEiLCJVc2VybmFtZSI6Im5ld25ldzhhZGYxIiwiUGFzc3dvcmQiOiIkMmIkMTAkZFlwNU1UQllNOWE3TUlKbVh0QU5pT0tTSWN1d0MxM1NBQ3UxQ1B5RDRWc0NhQ2VyRmdBbVMiLCJFbWFpbCI6Im5ld0BnbWFpbC5jb20iLCJCaXJ0aGRheSI6IjIwMDUtMDYtMTZUMDA6MDA6MDAuMDAwWiIsIkZhdm9yaXRlTW92aWVzIjpbXSwiX192IjowLCJpYXQiOjE3MTU2MzE5MDEsImV4cCI6MTcxNjIzNjcwMSwic3ViIjoibmV3bmV3OGFkZjEifQ.38FDouxICwPFxviHsMCVtqDOal33s-QmPGTgWsLJAC8`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const movieFromApi = data.map((movie) => {
          return { ...movie };
        });

        setMovies(movieFromApi);
      });
  }, []);
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", user);
            localStorage.setItem("token", token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
