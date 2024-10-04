import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'
import { imgURL } from "../../lib"

export const List = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('cms/products')
        .then(({data}) => setProducts(data))
        .catch(err => {})
        .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    style: {backgroundColor: 'var(--bs-danger)'},
                    onClick: () => {
                        setLoading(true)

                        http.delete(`cms/products/${id}`)
                            .then(() => http.get('cms/products'))
                            .then(({data}) => setProducts(data))
                            .catch(err => {})
                            .finally(() => setLoading(false))
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
                <Col>
                    <h1>Product</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/products/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Product
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {loading ? <Loading/> : 
                        <DataTable sortable={['Name', 'Category', 'Brand', 'Price', 'Dis. Price', 'Status', 'Featured', 'CreatedAt', 'UpdatedAt']} 
                                serachable={['Name', 'Category', 'Brand', 'Price', 'Dis. Price', 'Status', 'Featured', 'CreatedAt', 'UpdatedAt']} 
                                    data={products.map(product => {
                        return {
                            'Name': product.name,
                            'Image': <a href={imgURL(product.images[0])} target="_blank">
                                <img src={imgURL(product.images[0])} className="img-sm" />
                            </a>,
                            'Category': product.category.name,
                            'Brand': product.brand.name,
                            'Price': product.price,
                            'Dis. Price': product.discounted_price,
                            'Status': product.status ? 'Active' : 'Inactive',
                            'Featured': product.featured ? 'Yes' : 'No',
                            'CreatedAt': moment(product.CreatedAt).format('lll'),
                            'UpdatedAt': moment(product.UpdatedAt).format('lll'),
                            'Actions': <>
                                <Link to={`/products/${product._id}/edit`} className="btn btn-dark btn-sm me-2">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                                    <i className="fa-solid fa-trash me-2"></i>Delete
                                </Button>
                            </>
                        }
                    })} />}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}