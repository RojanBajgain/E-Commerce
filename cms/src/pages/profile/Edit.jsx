import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { FormField, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"

export const Edit = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user.value)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length) {
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address,
            })
        }
    }, [user])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit-profile', form)
            .then(() => http.get('profile/detail'))
            .then(({data}) => dispatch(setUser(data)))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={6} className="mx-auto">
                    <h1>Edit Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.name} required/>
                            </FormField>
                            <FormField title="phone" label="Phone">
                                <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.phone} required/>
                            </FormField>
                            <FormField title="address" label="Address">
                                <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.address} required/>
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