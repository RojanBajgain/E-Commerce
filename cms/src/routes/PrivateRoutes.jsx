import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fromStorage, removeStorage } from "../lib";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../http";
import { setUser } from "../store";
import { Loading } from "../components";

export const PrivateRoutes = ({ element }) => {
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const token = fromStorage("cmstoken");
      if (token) {
        setLoading(true);
        http
          .get("profile/detail")
          .then(({ data }) => {
            dispatch(setUser(data));
          })
          .catch(err => {
            removeStorage("cmstoken");
            toast.error("Please login to continue");
            navigate("/login");
          })
          .finally(() => setLoading(false));
      } else {
        toast.error("Please login to continue");
        navigate("/login");
      }
    }
  }, [user]);

  return loading ? <Loading></Loading> : element;
};
