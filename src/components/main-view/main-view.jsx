import React, { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      ID: "1",
      title: "Shrek",
      Description:
        "A green ogre embarks on a quest to rescue a princess and discovers the true meaning of friendship",
      Year: "2001",
      Genre: {
        GenreID: "1",
        Name: "Animation",
        Description: "Moving images created from a series of pictures.",
      },
      Director: {
        DirectorID: "1",
        Name: "Andrew Adamson",
        Birth: 1966,
        Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
      },
      Featured: "yes",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
    },

    {
      ID: "2",
      title: "Shrek 2",
      Description:
        "Shrek and Fiona visit Fiona's parents in the kingdom of Far Far Away, facing new challenges and humorous adventures",
      Year: "2004",
      Genre: {
        GenreID: "1",
        Name: "Animation",
        Description: "Moving images created from a series of pictures.",
      },
      Director: {
        DirectorID: "1",
        Name: "Andrew Adamson",
        Birth: 1966,
        Bio: "Andrew Adamson is a New Zealand filmmaker known for directing the popular animated films 'Shrek' and 'Shrek 2,' bringing humor and heart to the big screen.",
      },
      Featured: "yes",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    },

    {
      ID: "3",
      title: "Shrek the Third",
      Description:
        "Shrek must find a suitable heir to the throne of Far Far Away while dealing with Prince Charming's villainous ambitions",
      Year: "2007",
      Genre: {
        GenreID: "1",
        Name: "Animation",
        Description: "Moving images created from a series of pictures.",
      },
      Director: {
        DirectorID: "2",
        Name: "Chris Miller",
        Birth: 1966,
        Bio: "Chris Miller is a versatile director and screenwriter recognized for his work on animated films like 'Shrek the Third' and 'Puss in Boots,' contributing to their witty storytelling and vibrant characters.",
      },
      Featured: "yes",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
