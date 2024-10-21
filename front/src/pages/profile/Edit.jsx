import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormField, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { setUser } from "../../store";

export const Edit = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(user).length) {
      setForm({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .patch("profile/edit-profile", form)
      .then(() =>
        http.get("profile/detail").then(({ data }) => {
          dispatch(setUser(data));
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
            <FormField title="name" label="Name">
              <Form.Control
                type="text"
                name="name"
                id="name"
                required
                defaultValue={form.name}
                onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
            </FormField>
            <FormField title="phone" label="Phone">
              <Form.Control
                type="text"
                name="phone"
                id="phone"
                required
                defaultValue={form.phone}
                onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
            </FormField>
            <FormField title="address" label="Address">
              <Form.Control
                as="textarea"
                name="address"
                id="address"
                required
                defaultValue={form.address}
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
