import { Navigate } from "react-router-dom";

const SmartRedirect = () => {
  const token = localStorage.getItem("token");
  const lastPage = localStorage.getItem("lastPage");

  if (token) {
    return <Navigate to={lastPage} replace />;
  }

  return <Navigate to="/login" replace />;
};

export default SmartRedirect;