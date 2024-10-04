import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { FormField, Loading, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate, useParams } from "react-router-dom"
import Switch from "react-switch"

export const Edit = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [user, setUser] = useState({})   
    
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoadingPage(true)

        http.get(`cms/staffs/${params.id}`)
            .then(({data}) => setUser(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if(Object.keys(user).length) {
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address,
                status: user.status,
            })
        }
    }, [user])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/staffs/${params.id}`, form)
            .then(() => navigate('/staffs'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={6} className="mx-auto">
                    <h1>Edit Staff</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6} className="mx-auto">
                    {loadingPage ? <Loading /> : <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.name} required/>
                            </FormField>
                            <FormField title="phone" label="Phone">
                                <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.phone} required/>
                            </FormField>
                            <FormField title="address" label="Address">
                                <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.address} required/>
                            </FormField>
                            <FormField title="status" label="Status">
                                <br />
                                <Switch name="status" id="status" checked={form.status} onChange={() => setForm({
                                    ...form,
                                    status: !form.status
                                })} />
                            </FormField>
                            <div className="mb-3" disabled={loading}>
                                <SubmitBtn loading={loading}/>
                            </div>
                        </Form>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}