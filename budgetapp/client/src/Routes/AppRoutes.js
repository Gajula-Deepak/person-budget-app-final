import React, { useContext } from "react";
import ConfigureBudget from "../components/ConfigureBudget";
import RecordExpense from "../components/RecordExpense";
import RegisterForm from "../components/Register";
import LoginForm from "../components/Login";
import { Route, Routes, useNavigate } from "react-router-dom/dist";
import Layout from "../components/Layout";
import Visualizations from "../components/Visualizations";
import Visualization2 from "../components/visualizations/Visualization2";
import Visualization1 from "../components/visualizations/Visualization1";
import Visualization3 from "../components/visualizations/Visualization3";
import BudgetsList from "../components/BudgetsList";
import ExpensesList from "../components/ExpensesList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/register" element={<RegisterForm />}></Route>
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="budgets" element={<BudgetsList />} />
        <Route path="expenses" element={<ExpensesList />} />
        <Route path="visualizations" element={<Visualizations />}>
          <Route path="visualization1" element={<Visualization1 />} />
          <Route path="visualization2" element={<Visualization2 />} />
          <Route path="visualization3" element={<Visualization3 />} />
        </Route>
        <Route path="/budget">
          <Route path="configure" element={<ConfigureBudget />} />
          <Route path="expense" element={<RecordExpense />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
