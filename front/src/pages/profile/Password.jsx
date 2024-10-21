import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormField, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { setUser } from "../../store";

export const Password = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .patch("profile/change-password", form)
      .then(() =>
        http.get("profile/details").then(({ data }) => {
          dispatch(setUser(data));
          ev.target.reset();
        })
      )
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col lg={5} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <FormField title="old_password" label="Old Password">
              <Form.Control
                type="password"
                name="old_password"
                id="old_password"
                required
                onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
            </FormField>
            <FormField title="new_password" label="New Password">
              <Form.Control
                type="password"
                name="new_password"
                id="new_password"
                required
                onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
            </FormField>
            <FormField title="confirm_password" label="Confirm Password">
              <Form.Control
                type="password"
                name="confirm_password"
                id="confirm_password"
                required
                onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
            </FormField>
            <div className="mb-3">
              <SubmitBtn loading={loading}></SubmitBtn>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
