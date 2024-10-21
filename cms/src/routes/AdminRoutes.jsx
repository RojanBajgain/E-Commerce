import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminRoutes = ({ element }) => {
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length) {
      if (user.type != "Admin") {
        navigate("/");
      }
    }
  });
  return element;
};
