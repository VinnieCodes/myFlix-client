import React, { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movieflixer-b13bdd05bf25.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  // useEffect(() => {
  //   fetch("https://openlibrary.org/search.json?q=star+wars")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const booksFromApi = data.docs.map((doc) => {
  //         return {
  //           id: doc.key,
  //           title: doc.title,
  //           image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
  //           author: doc.author_name?.[0],
  //         };
  //       });

  //       setMovies(booksFromApi);
  //     });
  // }, []);

  // <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>

  // <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
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
