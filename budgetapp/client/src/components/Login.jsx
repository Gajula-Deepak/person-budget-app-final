import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "react-use-cookie";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the LoginModel object
    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("/authentication/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (
        (response.data.token && response.status === 200) ||
        (response.data.token && response.status === 201)
      ) {
        const data = response.data;
        const token = data.token;
        const expiration = data.expiration;
        setCookie("app-token", token, { expires: new Date(expiration) });
        toast.success("User logged in successfully!");
        setTimeout(() => {
          if (
            window.confirm(
              "Token is going to expire, do you want to refresh it?"
            )
          ) {
            axios
              .get("/authentication/refresh-token", {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then((response) => {
                const data = response.data;
                setCookie("app-token", data.token);
              })
              .catch((error) => {
                navigate("/login");
                setCookie("app-token", undefined);
                console.error("Error refreshing token:", error);
              });
          } else {
            document.cookie =
              "app-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate("/login");
          }
        }, 40000);
        navigate("/visualizations");
      } else {
        toast.error("User login failed!");
      }
    } catch (error) {
      toast.error("An error occurred during login:", error);
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

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button className="form-btn" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
