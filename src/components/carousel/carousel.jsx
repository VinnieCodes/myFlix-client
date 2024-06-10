import React from "react";
import Carousel from "react-bootstrap/Carousel";
import PropTypes from "prop-types";

export const MovieCarousel = ({ movies }) => {
  return (
    <Carousel>
      {movies.map((movie) => (
        <Carousel.Item key={movie._id}>
          <img
            className="d-block w-100"
            src={movie.ImageURL}
            alt={movie.Title}
          />
          <Carousel.Caption>
            <h3>{movie.Title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
