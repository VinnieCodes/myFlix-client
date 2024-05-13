import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movieflixer-b13bdd05bf25.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    }).then(response => response.json())
      .then((response) => {
      console.log(response);
      if (response.user) {
        onLoggedIn(response.user.Username, response.token);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
