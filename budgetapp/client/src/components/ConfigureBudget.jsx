import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import useCookie from "react-use-cookie";

const ConfigureBudget = () => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [cookieToken] = useCookie("app-token");

  console.log(cookieToken);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/api/budget-category",
        { categoryName: name, budgetAmount: budget },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieToken,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setName("");
        setBudget(0);
        toast.success("Budget Category created successfully");
      } else {
        toast.error(response.data.error || "Failed to create budget category");
      }
    } catch (error) {
      toast.error("Failed to create budget category");
    }
  };

  return (
    <div className="w-100 ">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId="budget">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="number"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button className="form-btn" variant="primary" type="submit">
          Configure
        </Button>
      </Form>
    </div>
  );
};

export default ConfigureBudget;
