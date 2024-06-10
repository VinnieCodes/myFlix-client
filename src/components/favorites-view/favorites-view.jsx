import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoritesView = ({ movies, onFavorite }) => {
  return (
    <div className="favorites-view">
      <h2 className="favorites-title">Your Favorite Movies</h2>
      <hr className="favorites-divider" />
      {movies.length === 0 ? (
        <p>Nothing here :(</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={movie._id}
              className="movie-card-container mb-5"
            >
              <MovieCard movie={movie} onFavorite={() => onFavorite(movie)} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

FavoritesView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      DirectorName: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onFavorite: PropTypes.func.isRequired,
};
