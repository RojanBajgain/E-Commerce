import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormField, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import { setUser } from "../../store";
import http from "../../http";

export const Edit = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    if (Object.keys(user).length) {
      setForm({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    http
      .patch("profile/edit-profile", form)
      .then(() => http.get("profile/detail"))
      .then(({ data }) => dispatch(setUser(data)))
      .catch(err => {})
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={6} className="mx-auto">
              <h1>Edit Profile</h1>
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
                    defaultValue={form.name}
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Phone" title="phone">
                  <Form.Control
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={form.phone}
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Address" title="address">
                  <Form.Control
                    type="text"
                    as="textarea"
                    id="address"
                    defaultValue={form.address}
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
