import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCarousel } from "../carousel/carousel";
import { ProfileView } from "../profile-view/profile-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [token]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://movieflixer-b13bdd05bf25.herokuapp.com/movies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data); // Initialize filteredMovies with all movies
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleUserUpdate = async (updatedUser) => {
    try {
      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error updating user:", error.message);
      return false;
    }
  };

  const handleUserDelete = async (username) => {
    try {
      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${username}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUser(null);
      setToken(null);
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      return false;
    }
  };

  const addFavorite = async (movie) => {
    try {
      const response = await fetch(
        `https://movieflixer-b13bdd05bf25.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
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
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (movieId) => {
    return user.FavoriteMovies.includes(movieId);
  };

  const findSimilarMovies = (selectedMovie) => {
    return movies.filter(
      (movie) =>
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie._id !== selectedMovie._id
    );
  };

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            myFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {user ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/favorites">
                    Favorites
                  </Nav.Link>
                  <Button variant="light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5 pt-5">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Row>
                  <MovieCarousel movies={filteredMovies} />
                  {filteredMovies.map((movie) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={movie._id}
                      className="movie-card-container mb-5"
                    >
                      <MovieCard user={user} movie={movie} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                }}
              />
            }
          />
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  onLoggedOut={handleLogout}
                  onUserUpdate={handleUserUpdate}
                  onUserDelete={handleUserDelete}
                  token={token}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/favorites"
            element={
              user ? (
                <FavoritesView
                  movies={filteredMovies.filter((m) =>
                    user.FavoriteMovies.includes(m._id)
                  )}
                  onFavorite={handleFavorite}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieView
                movies={filteredMovies}
                onFavorite={handleFavorite}
                findSimilarMovies={findSimilarMovies}
                isFavorite={isFavorite}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

MainView.propTypes = {
  onLoggedIn: PropTypes.func,
};
