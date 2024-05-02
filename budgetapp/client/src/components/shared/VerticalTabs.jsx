import React from "react";
import { Link, useLocation } from "react-router-dom/dist";

function VerticalTabs({ pathObjects }) {
  const route = useLocation();
  return (
    <div id="vertical-tabs-container">
      {pathObjects.map((po, id) => (
        <Link to={po.path} key={id}>
          <div
            className={
              route.pathname === po.path
                ? "header-link selected"
                : "header-link"
            }
          >
            {po.pathName}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VerticalTabs;
