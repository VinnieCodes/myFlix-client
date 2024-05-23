import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user }) => {
  console.log(movie);
  const addFavorite = (event) => {
    event.preventDefault();

    fetch(
      "https://movieflixer-b13bdd05bf25.herokuapp.com/users/" +
        user.Username +
        "/movies/" +
        movie._id,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Update Successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };
  const removeFavorite = (event) => {
    event.preventDefault();

    fetch(
      "https://movieflixer-b13bdd05bf25.herokuapp.com/users/" +
        user.Username +
        "/movies/" +
        movie._id,
      {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Update Successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="link" onClick={addFavorite}>
          Add to Favorite
        </Button>
        <Button variant="link" onClick={removeFavorite}>
          Remove from Favorite
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    DirectorName: PropTypes.string,
    Description: PropTypes.string,
    GenreName: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
