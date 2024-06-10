import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({
  movies,
  findSimilarMovies,
  onFavorite,
  isFavorite,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = findSimilarMovies(movie);

  return (
    <>
      <Card className="movie-view">
        <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
        <Card.Body>
          <Card.Title>
            <h2>{movie.Title}</h2>
          </Card.Title>
          <Card.Text>
            <strong>Genre:</strong> {movie.Genre.Name}
            <br />
            <strong>Director:</strong> {movie.Director.Name}
            <br />
            <br></br>
            <strong>Description:</strong> {movie.Description}
          </Card.Text>
          <Link to={`/`}>
            <Button variant="light">
              Back
            </Button>
          </Link>
          <Button variant="outline-primary" onClick={() => onFavorite(movie)}>
            {isFavorite(movie._id) ? "Remove from Favorites" : "Favorite"}
          </Button>
        </Card.Body>
      </Card>
      <h3 className="mt-5">Similar Movies</h3>
      <hr></hr>
      <Row>
        {similarMovies.map((similarMovie) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={similarMovie._id}
            className="movie-card-container mb-5"
          >
            <MovieCard movie={similarMovie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
  findSimilarMovies: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};
