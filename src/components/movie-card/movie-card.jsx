import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  
  const [user, setUser] = useState(initialUser);

  const addFavorite = async (movie) => {
    try {
      if (!user || !token) {
        throw new Error("User or token not found");
      }

      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add favorite movie");
      }
      const updatedUser = {
        ...user,
        FavoriteMovies: [...user.FavoriteMovies, movie._id],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      location.href = "/profile";
    } catch (error) {
      console.error("Error adding favorite movie:", error.message);
    }
  };

  const removeFavorite = async (movie) => {
    try {
      if (!user || !token) {
        throw new Error("User or token not found");
      }

      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove favorite movie");
      }
      const updatedUser = {
        ...user,
        FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movie._id),
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      location.href = "/profile";
    } catch (error) {
      console.error("Error removing favorite movie:", error.message);
    }
  };

  const handleFavorite = (movie) => {
    if (!user || !token) {
      console.error("User or token not found");
      return;
    }

    if (user.FavoriteMovies.includes(movie._id)) {
      removeFavorite(movie);
      alert("Removed!");
    } else {
      addFavorite(movie);
      alert("Added!");
    }
  };

   const isFavorite = (movieId) => {
    return user.FavoriteMovies.includes(movieId);
  };

  if (!movie) {
    return null; // or return a placeholder UI if the movie is not defined
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="outline-dark">Open</Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              console.log("Hi");
              handleFavorite(movie);
            }}
          >
            +/-
          </Button>
        </Link>
        <Button
          variant="outline-primary"
          onClick={() => {
            handleFavorite(movie);
          }}
        >
          {isFavorite(movie._id) ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
