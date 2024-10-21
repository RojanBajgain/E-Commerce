import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormField, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import { setUser } from "../../store";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

export const Create = () => {
  const [form, setForm] = useState({ status: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    http
      .post("cms/staffs", form)
      .then(() => navigate("/staffs"))
      .catch(err => {})
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={6} className="mx-auto">
              <h1>Add Staff</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mx-auto">
              <Form onSubmit={handleSubmit}>
                <FormField label="Name" title="name">
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Email" title="email">
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Phone" title="phone">
                  <Form.Control
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Address" title="address">
                  <Form.Control
                    as="textarea"
                    name="address"
                    id="address"
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
                <FormField label="Confirm Password" title="confirm_password">
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField title="status" label="Status">
                  <br />
                  <Switch
                    name="status"
                    id="status"
                    checked={form.status}
                    onChange={() =>
                      setForm({
                        ...form,
                        status: !form.status,
                      })
                    }></Switch>
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
