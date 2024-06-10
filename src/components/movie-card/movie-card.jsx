import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  console.log(user);

  const addFavorite = async (movie) => {
    try {
      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Content: "application/json",
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
    } catch (error) {
      console.error("Error adding favorite movie:", error.message);
    }
  };

  const removeFavorite = async (movie) => {
    try {
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
    } catch (error) {
      console.error("Error removing favorite movie:", error.message);
    }
  };

  const handleFavorite = (movie) => {
    console.log("Hey");
    if (user.FavoriteMovies.includes(movie._id)) {
      removeFavorite(movie);
      alert("Removed!");
    } else {
      addFavorite(movie);
      alert("Added!");
    }
  };

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
  }).isRequired,
};
