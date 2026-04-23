// import { Navigate } from "react-router-dom";

// const AuthRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   return token ? <Navigate to="/schemes" replace /> : children;
// };

// export default AuthRoute;

import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (user.role === "Admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "Manager") {
      return <Navigate to="/manager" replace />;
    }

    return <Navigate to="/schemes" replace />;
  }

  return children;
};

export default AuthRoute;


