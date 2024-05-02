import React, { useState, useEffect } from "react";
import axios from "axios";
import reactUseCookie from "react-use-cookie";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [cookieToken] = reactUseCookie("app-token");
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("/api/expenses", {
          headers: {
            Authorization: "Bearer " + cookieToken,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch budget categories:", error);
      }
    };

    fetchExpenses();
  }, [cookieToken]);

  console.log(expenses);
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <strong>{expense.description}</strong>, category:{" "}
            <strong>{expense.budgetCategory.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
