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
    const [category, setCategory] = useState({})   
    
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoadingPage(true)

        http.get(`cms/categories/${params.id}`)
            .then(({data}) => setCategory(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if(Object.keys(category).length) {
            setForm({
                name: category.name,
                status: category.status,
            })
        }
    }, [category])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/categories/${params.id}`, form)
            .then(() => navigate('/categories'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={6} className="mx-auto">
                    <h1>Edit Category</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6} className="mx-auto">
                    {loadingPage ? <Loading /> : <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.name} required/>
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