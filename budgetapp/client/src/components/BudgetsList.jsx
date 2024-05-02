import React, { useState, useEffect } from "react";
import axios from "axios";
import reactUseCookie from "react-use-cookie";

const BudgetsList = () => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [cookieToken] = reactUseCookie("app-token");
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

  return (
    <div>
      <h2>Budget Categories</h2>
      <ul>
        {budgetCategories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetsList;
