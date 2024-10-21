import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormField, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import { setUser } from "../../store";
import http from "../../http";

export const Password = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    http
      .patch("profile/change-password", form)
      .then(() => http.get("profile/detail"))
      .then(({ data }) => {
        dispatch(setUser(data));
        ev.target.reset();
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={6} className="mx-auto">
              <h1>Change Password</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mx-auto">
              <Form onSubmit={handleSubmit}>
                <FormField label="Old Password" title="old_password">
                  <Form.Control
                    type="password"
                    name="old_password"
                    id="old_password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="New Password" title="new_password">
                  <Form.Control
                    type="password"
                    name="new_password"
                    id="new_password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Confirm Password" title="confirm_password">
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <div className="mb-3">
                  <SubmitBtn loading={loading}></SubmitBtn>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
