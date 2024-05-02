import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import reactUseCookie from "react-use-cookie";

function Visualization3() {
  const [expenseData, setExpenseData] = useState([]);
  const [cookieToken] = reactUseCookie("app-token");
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get("/api/expenses", {
          headers: {
            Authorization: "Bearer " + cookieToken,
          },
        });
        setExpenseData(response.data);
      } catch (error) {
        console.error("Failed to fetch expense data:", error);
      }
    };

    fetchExpenseData();
  }, []);
  console.log(expenseData);

  const aggregatedExpenseData = {};
  expenseData.forEach((expense) => {
    const monthYear = new Date(expense.expenseDate).toLocaleDateString(
      "en-US",
      { month: "long", year: "numeric" }
    );
    if (!aggregatedExpenseData[monthYear]) {
      aggregatedExpenseData[monthYear] = 0;
    }
    aggregatedExpenseData[monthYear] += expense.amount;
  });

  const chartData = [["Month", "Expense Amount"]];
  Object.entries(aggregatedExpenseData).forEach(
    ([monthYear, totalExpenses]) => {
      chartData.push([monthYear, totalExpenses]);
    }
  );

  const options = {
    title: "Expense Trends Over Time",
    hAxis: {
      title: "Month",
    },
    vAxis: {
      title: "Expense Amount",
      minValue: 0,
    },
    chartArea: { width: "80%", height: "60%" },
  };

  return (
    <div>
      <Chart
        chartType="LineChart"
        width={"100%"}
        height={"400px"}
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default Visualization3;
