import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../http";
import { inStorage } from "../../lib";
import { setUser } from "../../store/user.slice";
import { Tab, Tabs } from "react-bootstrap";
import { Orders } from "./Orders";
import { Reviews } from "./Reviews";
import { Edit } from "./Edit";
import { Password } from "./Password";

export const Dashboard = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .post("auth/login", form)
      .then(({ data }) => {
        dispatch(setUser(data.user));
        inStorage("fronttoken", data.token, remember);
        navigate("/");
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="col-12">
      {/* <!-- Main Content --> */}
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>User Dashboard</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-8 col-md-10 col-sm-10 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              <Tabs
                defaultActiveKey="orders"
                id="justify-tab-example"
                className="mb-3"
                justify>
                <Tab
                  eventKey="orders"
                  title={
                    <>
                      <i className="fa-solid fa-gifts me-2"></i>My orders
                    </>
                  }>
                  <Orders></Orders>
                </Tab>
                <Tab
                  eventKey="reviews"
                  title={
                    <>
                      <i className="fa-solid fa-comments me-2"></i>My Reviews
                    </>
                  }>
                  <Reviews></Reviews>
                </Tab>
                <Tab
                  eventKey="edit"
                  title={
                    <>
                      <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                    </>
                  }>
                  <Edit></Edit>
                </Tab>
                <Tab
                  eventKey="password"
                  title={
                    <>
                      <i className="fa-solid fa-asterisk me-2"></i>Change
                      Password
                    </>
                  }>
                  <Password></Password>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Main Content --> */}
    </div>
  );
};
