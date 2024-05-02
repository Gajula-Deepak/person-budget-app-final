import React from "react";
import { Link, useLocation } from "react-router-dom/dist";

function Tabs({ pathObjects }) {
  const route = useLocation();
  return (
    <div id="header-link-container">
      {pathObjects.map((po, id) => (
        <Link to={po.path} key={id}>
          <div
            className={
              route.pathname.includes(po.path)
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

export default Tabs;
