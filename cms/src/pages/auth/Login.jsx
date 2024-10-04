import { useState } from "react"
import { Col, Container, Row, Form } from "react-bootstrap"
import { inStorage, setInForm } from "../../lib"
import { FormField, SubmitBtn } from "../../components"
import http from "../../http"
import { useDispatch } from "react-redux"
import { setUser } from "../../store"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('auth/login', form)
            .then(({data}) => {
                dispatch(setUser(data.user))
                inStorage('frontcmstoken', data.token, remember)
                navigate('/')
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }


    return <Container>
    <Row>
        <Col lg={4} md={5} sm={8} className="bg-body my-5 mx-auto py-3 rounded-2 shadow-2">
            <Row>
                <Col>
                    <h1 className="text-center">Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <FormField title="email" label="Email">
                            <Form.Control type="email" name="email" id="email" onChange={ev => setInForm(ev, form, setForm)} required />
                        </FormField>

                        <FormField title="password" label="Password">
                            <Form.Control type="password" name="password" id="password"  onChange={ev => setInForm(ev, form, setForm)} required />
                        </FormField>
                        
                        <div className="mb-3 form-check">
                            <Form.Check.Input value="yes" id="remember" defaultChecked={remember} onClick={ev => setRemember(!remember)} />
                            <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                            <br />
                        </div>
                        <div className="mb-3 d-grid" disabled={loading}>
                            <SubmitBtn icon="fa-sign-in-alt" label="Log In" loading={loading}/>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}