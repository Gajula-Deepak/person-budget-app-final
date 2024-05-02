import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import reactUseCookie from "react-use-cookie";

export const data = {};

const RecordExpense = () => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookieToken] = reactUseCookie("app-token");

  console.log(budgetCategories);

  useEffect(() => {
    const fetchBudgetCategories = async () => {
      try {
        const response = await axios.get("/api/budget-categories", {
          headers: {
            Authorization: "Bearer " + cookieToken,
          },
        });
        setBudgetCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch budget categories:", error);
      }
    };

    fetchBudgetCategories();
  }, [cookieToken]);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    console.log(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/api/expense",
        { budgetCategory: categoryId, description: name, amount: amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieToken,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        setCategoryId("");
        setName("");
        setAmount(0);
        setErrorMessage("");
        toast.success("Expense created successfully");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to create expense");
      }
    } catch (error) {
      setErrorMessage("Failed to create expense");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={categoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {budgetCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="form-btn" variant="primary" type="submit">
          Record Expense
        </Button>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RecordExpense;
