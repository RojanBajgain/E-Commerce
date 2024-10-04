import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { FormField, Loading, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate } from "react-router-dom"
import Switch from "react-switch"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const Create = () => {
    const [form, setForm] = useState({status: true, featured: false})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [imgPreview, setImgPreview] = useState([])

    const navigate  = useNavigate()

    useEffect(() => {
        setLoadingPage(true)
        http.get('cms/categories')
            .then(({data}) => {
                setCategories(data)
                return http.get('cms/brands')
            })
            .then(({data}) => setBrands(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    },[])

    useEffect(() => {
        if(form.images && form.images.length) {
            let list = [];
            let i = 0;

            for(let image of form.images) {
                list.push(<Col lg={4} key={i++} className="mt-3">
                    <img className="img-fluid" src={URL.createObjectURL(image)} />
                </Col>)
            }
            setImgPreview(list)
        }
    }, [form.images])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        const fd = new FormData

        for(let k in form) {
            if(k == 'images') {
                for(let image of form.images) {
                    fd.append(k, image)
                }
            } else {
                fd.append(k, form[k])
            }
        }

        http.post('cms/products', fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => navigate('/products'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={9} className="mx-auto">
                    <h1>Add Product</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={9} className="mx-auto">
                    {loadingPage ? <Loading/> : <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>
                            <FormField title="summary" label="Summary">
                                <ReactQuill theme="snow" onChange={data => setForm({
                                    ...form,
                                    summary: data
                                })} />
                            </FormField>
                            <FormField title="description" label="Description">
                            <ReactQuill theme="snow" onChange={data => setForm({
                                    ...form,
                                    description: data
                                })} />
                            </FormField>

                            <FormField title="price" label="Price">
                                <Form.Control type="text" name="price" id="price" onChange={ev => setInForm(ev, form, setForm)} required/>
                            </FormField>

                            <FormField title="discounted_price" label="Discounted Price">
                                <Form.Control type="text" name="discounted_price" id="discounted_price" onChange={ev => setInForm(ev, form, setForm)}/>
                            </FormField>

                            <FormField title="images" label="Images">
                                <Form.Control type="file" name="images" id="images" onChange={ev => setForm({
                                    ...form,
                                    images: ev.target.files
                                })} accept="image/*"  multiple required />
                                {imgPreview.length ? <Row>
                                    {imgPreview.map(image => image)}
                                </Row> : null}

                            </FormField>
                            <FormField title="category_id" label="Category">
                                <Form.Select name="category_id" id="category_id" onChange={ev => setInForm(ev, form, setForm)} required>
                                    <option value="">Select a category</option>
                                    {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                                </Form.Select>
                            </FormField>
                            <FormField title="brand_id" label="Brand">
                                <Form.Select name="brand_id" id="brand_id" onChange={ev => setInForm(ev, form, setForm)} required>
                                    <option value="">Select a Brand</option>
                                    {brands.map(brand => <option value={brand._id} key={brand._id}>{brand.name}</option>)}
                                </Form.Select>
                            </FormField>

                            <FormField title="status" label="Status">
                                <br />
                                <Switch name="status" id="status" checked={form.status} onChange={() => setForm({
                                    ...form,
                                    status: !form.status
                                })} />
                            </FormField>

                            <FormField title="featured" label="Featured">
                                <br />
                                <Switch name="featured" id="featured" checked={form.featured} onChange={() => setForm({
                                    ...form,
                                    featured: !form.featured
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