import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "/authentication/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
        toast.success("User created successfully! Please login");
      } else {
        toast.error("User registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>
          Password (It must be 8 characters long, with a number, a capital
          letter and a special character)
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button className="form-btn" variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
