import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-google-charts";
import reactUseCookie from "react-use-cookie";
function Visualization2() {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
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

  const fetchExpenses = useCallback(async () => {
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
  }, [cookieToken]);

  useEffect(() => {
    fetchBudgetCategories();
    fetchExpenses();
  }, [fetchBudgetCategories, fetchExpenses]);

  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    if (budgetCategories && expenses) {
      console.log(budgetCategories, expenses);
      debugger;
      var data = budgetCategories.map((x) => {
        const expensesInThisCategory = expenses.filter(
          (y) =>
            y.budgetCategory._id == x._id &&
            new Date(y.expenseDate).getMonth() + 1 == month
        );
        const totalExpenses = expensesInThisCategory.reduce(
          (acc, cur) => acc + cur.amount,
          0
        );
        return [x.name, x.budgetAmount, totalExpenses];
      });
      data.unshift(["value", "budget", "expense"]);
      console.log(data);
      setChartData(data);
    }
  }, [budgetCategories, expenses, month]);

  const options = {
    title: "Budget Expense month wise comparison",
    chartArea: { width: "80%" },
  };

  return (
    <div className="visualization1-container">
      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "40px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span style={{ fontSize: "larger" }}>Month: </span>
        <select
          value={month.toString()}
          onChange={(e) => {
            setMonth(Number(e.target.value));
          }}
          style={{
            padding: "5px",
          }}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((monthName, i) =>
            i < currentMonth ? (
              <option value={i + 1} key={i}>
                {monthName}
              </option>
            ) : (
              <></>
            )
          )}
        </select>
      </div>
      <div>
        {chartData ? (
          <Chart
            chartType="ColumnChart"
            width="80%"
            style={{
              margin: "auto",
            }}
            height="200px"
            data={chartData}
            options={options}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}

export default Visualization2;
