import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Chart from "react-google-charts";
import reactUseCookie from "react-use-cookie";

function Visualization1() {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [cookieToken] = reactUseCookie("app-token");
  const fetchBudgetCategories = useCallback(async () => {
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
  }, [cookieToken]);

  useEffect(() => {
    fetchBudgetCategories();
  }, [fetchBudgetCategories]);

  const categoriesData = useMemo(() => {
    let result = budgetCategories.map((x) => [x.name, x.budgetAmount]);
    result.unshift(["Category", "Budget"]);
    return result;
  }, [budgetCategories]);

  const options = {
    title: "Budget Allocation",
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={categoriesData}
        options={options}
        width={"80%"}
        style={{
          margin: "auto",
        }}
        height={"400px"}
      />
    </div>
  );
}

export default Visualization1;
