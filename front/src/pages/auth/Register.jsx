import { useState } from "react";
import { setInForm } from "../../lib";
import { Form } from "react-bootstrap";
import { FormField, SubmitBtn } from "../../components";
import http from "../../http";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .post("auth/register", form)
      .then(() => navigate("/login"))
      .catch(err => {})
      .finally(() => setLoading(false));
  };
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Register</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <FormField title="name" label="Name">
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="email" label="Email">
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="password" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="confirm_password" label="Confirm Password">
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="phone" label="Phone">
                  <Form.Control
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="address" label="Address">
                  <Form.Control
                    as="textarea"
                    name="address"
                    id="address"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="agree"
                      className="form-check-input"
                      required
                    />
                    <label htmlFor="agree" className="form-check-label ml-2">
                      I agree to Terms and Conditions
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="mb-3">
                    <SubmitBtn
                      label="Register"
                      icon="fa-user-plus"
                      loading={loading}></SubmitBtn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
