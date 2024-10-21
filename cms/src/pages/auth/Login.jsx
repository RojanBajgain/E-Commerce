import { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { inStorage, setInForm } from "../../lib";
import { FormField, SubmitBtn } from "../../components";
import http from "../../http";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({});
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    http
      .post("auth/login", form)
      .then(({ data }) => {
        dispatch(setUser(data.user));
        inStorage("cmstoken", data.token, remember);
        navigate("/");
      })
      .catch()
      .finally(() => setLoading(false));
  };
  return (
    <Container>
      <Row>
        <Col
          lg={4}
          md={5}
          sm={8}
          className="my-5 py-3 shadow-sm bg-body mx-auto">
          <Row>
            <Col>
              <h1 className="text-center">Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormField label="Email" title="email">
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Password" title="password">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <div className="mb-3 form-check">
                  <Form.Check.Input
                    value="yes"
                    id="remember"
                    defaultChecked={remember}
                    onClick={ev => setRemember(!remember)}></Form.Check.Input>
                  <Form.Check.Label htmlFor="remember">
                    Remember Me
                  </Form.Check.Label>
                </div>
                <div className="mb-3 d-grid">
                  <SubmitBtn
                    icon="fa-sign-in-alt"
                    label="Log In"
                    loading={loading}></SubmitBtn>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
