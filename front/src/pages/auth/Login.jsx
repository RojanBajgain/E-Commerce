import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormField, SubmitBtn } from "../../components";
import http from "../../http";
import { inStorage, setInForm } from "../../lib";
import { setUser } from "../../store/user.slice";

export const Login = () => {
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
          <h2>Login</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <FormField title="email" label="Email">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                    onChange={ev => {
                      setInForm(ev, form, setForm);
                    }}
                  />
                </FormField>
                <FormField title="password" label="Password">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    required
                    onChange={ev => {
                      setInForm(ev, form, setForm);
                    }}
                  />
                </FormField>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-check-input"
                    defaultChecked={remember}
                    onClick={() => setRemember(!remember)}
                  />
                  <label htmlFor="remember" className="form-check-label ml-2">
                    Remember Me
                  </label>
                </div>

                <div className="form-group">
                  <SubmitBtn
                    label="Login"
                    icon="fa-sign-in-alt"
                    loading={loading}></SubmitBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
