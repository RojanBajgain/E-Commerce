import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { FormField, Loading, SubmitBtn } from "../../components"
import { imgURL, setInForm } from "../../lib"
import http from "../../http"
import { useNavigate, useParams } from "react-router-dom"
import Switch from "react-switch"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { confirmAlert } from "react-confirm-alert"

export const Edit = () => {
    const [product, setProduct] = useState({})
    const [form, setForm] = useState({status: true, featured: false})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [imgPreview, setImgPreview] = useState([])

    const navigate  = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get('cms/categories')
            .then(({data}) => {
                setCategories(data)
                return http.get('cms/brands')
            })
            .then(({data}) => {
                setBrands(data)
                return http.get(`cms/products/${params.id}`)
            })
            .then(({data}) => setProduct(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    },[])

    useEffect(() => {
        if(Object.keys(product).length) {
            setForm({
                name: product.name,
                summary: product.summary,
                description: product.description,
                price: product.price,
                discounted_price: product.discounted_price,
                category_id: product.category_id,
                brand_id: product.brand_id,
                status: product.status,
                featured: product.featured,
            })
        }
    }, [product])

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

        http.patch(`cms/products/${params.id}`, fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => navigate('/products'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    const handleDelete = filename => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    style: {backgroundColor: 'var(--bs-danger)'},
                    onClick: () => {
                        setLoadingPage(true)

                        http.delete(`cms/products/${params.id}/image/${filename}`)
                            .then(() => http.get(`cms/products/${params.id}`))
                            .then(({data}) => setProduct(data))
                            .catch(err => {})
                            .finally(() => setLoadingPage(false))
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
    }

    return <Container>
    <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-2">
            <Row>
                <Col lg={9} className="mx-auto">
                    <h1>Edit Product</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={9} className="mx-auto">
                    {loadingPage ? <Loading/> : Object.keys(product).length ? <Form onSubmit={handleSubmit}>
                            <FormField title="name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.name} required/>
                            </FormField>
                            <FormField title="summary" label="Summary">
                                <ReactQuill theme="snow" value={form.summary} onChange={data => setForm({
                                    ...form,
                                    summary: data
                                })} />
                            </FormField>
                            <FormField title="description" label="Description">
                            <ReactQuill theme="snow" value={form.description} onChange={data => setForm({
                                    ...form,
                                    description: data
                                })} />
                            </FormField>

                            <FormField title="price" label="Price">
                                <Form.Control type="text" name="price" id="price" onChange={ev => setInForm(ev, form, setForm)} defaultValue={product.price} required/>
                            </FormField>

                            <FormField title="discounted_price" label="Discounted Price">
                                <Form.Control type="text" name="discounted_price" id="discounted_price" onChange={ev => setInForm(ev, form, setForm)} defaultValue={product.discounted_price}/>
                            </FormField>

                            <FormField title="images" label="Images">
                                <Form.Control type="file" name="images" id="images" onChange={ev => setForm({
                                    ...form,
                                    images: ev.target.files
                                })} accept="image/*" multiple />
                                {imgPreview.length ? <Row>
                                    {imgPreview.map(image => image)}
                                </Row> : null}

                                <Row>
                                    {product.images.map((image, i) => <Col lg={4} key={i} className="mt-3">
                                        <Row>
                                            <Col xs={12}>
                                            <img className="img-fluid" src={imgURL(image)} />
                                            </Col>
                                            <Col xs={12} className="mt-3 text-center">
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(image)}>
                                                    <i className="fa-solid fa-trash me-2"></i>Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>)}
                                </Row>

                                {/* <Row>
                                    {product.images?.length ? product.images.map((image, i) => (
                                        <Col lg={4} key={i} className="mt-3">
                                            <img className="img-fluid" src={imgURL(image)} alt={`Product image ${i}`} />
                                        </Col>
                                    )) : <p>No images available</p>}
                                </Row> */}


                            </FormField>
                            <FormField title="category_id" label="Category">
                                <Form.Select name="category_id" id="category_id" onChange={ev => setInForm(ev, form, setForm)} value={form.category_id} required>
                                    <option value="">Select a category</option>
                                    {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                                </Form.Select>
                            </FormField>
                            <FormField title="brand_id" label="Brand">
                                <Form.Select name="brand_id" id="brand_id" onChange={ev => setInForm(ev, form, setForm)} value={form.brand_id} required>
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
                        </Form> : null}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}