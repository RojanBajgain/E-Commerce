import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { FormField, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate } from "react-router-dom"
import Switch from "react-switch"

export const Create = () => {
    const [form, setForm] = useState({status: true})
    const [loading, setLoading] = useState(false)

    const navigate  = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/customers', form)
            .then(() => navigate('/customers'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={6} className="mx-auto">
                    <h1>Add Customer</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="email" label="Email">
                                <Form.Control type="email" name="email" id="email" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="password" label="New Password">
                                <Form.Control type="password" name="password" id="password" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="confirm_password" label="Confirm password">
                                <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="phone" label="Phone">
                                <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="address" label="Address">
                                <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            {/* <FormField title="status" label="Status">
                                <br />
                                <Switch name="status" id="status" checked={form.status} onChange={() => setForm({
                                    ...form,
                                    status: !form.status
                                })} />
                            </FormField> */}
                            <div className="mb-3" disabled={loading}>
                                <SubmitBtn loading={loading}/>
                            </div>
                        </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}