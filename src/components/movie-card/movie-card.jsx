import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(movie);
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
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
  onBookClick: PropTypes.func.isRequired,
};
