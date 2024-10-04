import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { FormField, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"

export const Password = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/change-password', form)
            .then(() => http.get('profile/detail'))
            .then(({data}) => {
                dispatch(setUser(data))
                ev.target.reset()
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={6} className="mx-auto">
                    <h1>Change Password</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                            <FormField title="old_password" label="Old password">
                                <Form.Control type="password" name="old_password" id="old_password" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="new_password" label="New password">
                                <Form.Control type="password" name="new_password" id="new_password" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="confirm_password" label="Confirm password">
                                <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            
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