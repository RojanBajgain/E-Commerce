import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fromStorage, removeStorage } from "../lib";
import { clearUser, setUser } from "../store/user.slice";
import { Button } from "react-bootstrap";
import http from "../http";
import { useEffect } from "react";

export const TopNav = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      const token = fromStorage("fronttoken");
      if (token) {
        http
          .get("profile/detail")
          .then(({ data }) => {
            dispatch(setUser(data));
          })
          .catch(err => {
            removeStorage("fronttoken");
            navigate("/");
          });
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const handleLogout = () => {
    removeStorage("fronttoken");
    dispatch(clearUser());
  };

  return (
    <ul className="top-nav">
      {Object.keys(user).length ? (
        <>
          <li>
            <Link to="profile">
              <i className="fas fa-user-edit me-2"></i>
              {user.name}
            </Link>
          </li>
          <li>
            <Button
              variant="link"
              className="link-light text-decoration-none p-0 "
              onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt me-2"></i>LogOut
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="register">
              <i className="fas fa-user-edit me-2"></i>Register
            </Link>
          </li>
          <li>
            <Link to="login">
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
