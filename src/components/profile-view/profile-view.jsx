import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col, Alert, Modal } from "react-bootstrap";

export const ProfileView = ({
  user,
  onLoggedOut,
  onUserUpdate,
  onUserDelete,
  token,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
//sus
  useEffect(() => {
    if (user.Birthday) {
      setBirthday(new Date(user.Birthday).toISOString().split("T")[0]);
    }
  }, [user.Birthday]);

  const handleUpdate = async () => {
    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: birthday,
      FavoriteMovies: user.FavoriteMovies || [],
    };
    if (password) {
      updatedUser.Password = password;
    }

    const success = await onUserUpdate(updatedUser);
    if (success) {
      setUpdateMessage("User updated successfully!");
      setTimeout(() => setUpdateMessage(""), 3000);
    }
  };

  const handleDelete = async () => {
    const success = await onUserDelete(user.Username);
    if (success) {
      onLoggedOut();
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2 className="profile-title">User Profile</h2>
        <hr className="profile-divider" />
        {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" onClick={handleUpdate} className="me-2">
            Update
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </Button>
        </Form>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Deleting Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowDeleteModal(false)}>
              Close
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
