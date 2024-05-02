import React, { useEffect } from "react";
import VerticalTabs from "./shared/VerticalTabs";
import { Outlet, useNavigate } from "react-router-dom/dist";
import reactUseCookie from "react-use-cookie";

function Visualizations() {
  const navigate = useNavigate();
  const [cookieToken] = reactUseCookie("app-token");
  useEffect(() => {
    if (!cookieToken || !cookieToken.length || cookieToken == "undefined") {
      navigate("/");
    }
    navigate("/visualizations/visualization1");
  }, []);
  return (
    <div className="visualizations-container">
      <div className="visualizations-tab-container">
        <VerticalTabs
          pathObjects={[
            {
              pathName: "Visualization 1",
              path: "/visualizations/visualization1",
            },
            {
              pathName: "Visualization 2",
              path: "/visualizations/visualization2",
            },
            {
              pathName: "Visualization 3",
              path: "/visualizations/visualization3",
            },
          ]}
        />
      </div>
      <div className="visualization-diagram">
        <Outlet />
      </div>
    </div>
  );
}

export default Visualizations;
