import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormField, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
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
      .post("cms/brands", form)
      .then(() => navigate("/brands"))
      .catch(err => {})
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={6} className="mx-auto">
              <h1>Add Brand</h1>
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
