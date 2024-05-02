import React, { useEffect, useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom/dist";
import Tabs from "./shared/Tabs";
import reactUseCookie, { setCookie } from "react-use-cookie";

function Layout() {
  const route = useLocation();
  const navigate = useNavigate();
  console.log(route);
  const [cookieToken] = reactUseCookie("app-token");
  console.log(cookieToken.length);
  useEffect(() => {
    if (cookieToken && cookieToken.length && cookieToken != "undefined") {
      navigate("/visualizations/visualization1");
    } else {
      navigate("/login");
    }
  }, []);

  const showHeader = useMemo(() => {
    if (route.pathname == "/register" || route.pathname == "/login") {
      return false;
    }
    return true;
  }, [route]);

  const handleLogout = () => {
    setCookie("app-token", undefined);
    navigate("/login");
  };

  return (
    <div id="layout-container">
      <div id="main-container">
        {showHeader && (
          <div id="header">
            <Tabs
              pathObjects={[
                {
                  pathName: "Visualizations",
                  path: "/visualizations",
                },
                {
                  pathName: "All budgets",
                  path: "/budgets",
                },
                {
                  pathName: "All Expenses",
                  path: "/expenses",
                },
                {
                  pathName: "Configure Budget",
                  path: "/budget/configure",
                },
                {
                  pathName: "Record Expense",
                  path: "/budget/expense",
                },
              ]}
            />
            <div
              className="header-link-auth"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </div>
          </div>
        )}
        {!showHeader && (
          <div id="header">
            <Tabs
              pathObjects={[
                {
                  pathName: "Register",
                  path: "/register",
                },
                {
                  pathName: "Login",
                  path: "/login",
                },
              ]}
            />
          </div>
        )}
        <div className="pages-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
