import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  // @ts-ignore
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {
    navigate("/login");
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
