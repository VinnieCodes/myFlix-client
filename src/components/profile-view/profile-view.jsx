import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";


export const ProfileView = ({ movies, user, setSelectedMovie }) => {
  console.log(movies);
  console.log(user);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  

  let result = movies.filter((m) => user.FavoriteMovies.includes(m._id));
  console.log(result);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    //refactor
    fetch(
      "https://movieflixer-b13bdd05bf25.herokuapp.com/users/" + user.Username,
      {
        method: "PUT",
        body: JSON.stringify(data),
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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit changes
        </Button>
      </Form>
      <h1>Favorite Movies</h1>
      <br />
      {result.map((movie) => {
        return (
          <Col className="mb-4" lg={4} md={6}>
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
              user={user}
            />
          </Col>
        );
      })}
    </div>
  );
};
