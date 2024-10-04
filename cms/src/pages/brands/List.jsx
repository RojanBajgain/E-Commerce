import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'

export const List = () => {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('cms/brands')
        .then(({data}) => setBrands(data))
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

                        http.delete(`cms/brands/${id}`)
                            .then(() => http.get('cms/brands'))
                            .then(({data}) => setBrands(data))
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
                    <h1>Brand</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/brands/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Brand
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {loading ? <Loading/> : 
                        <DataTable sortable={['Name', 'Status', 'CreatedAt', 'UpdatedAt']} 
                                serachable={['Name', 'Status', 'CreatedAt', 'UpdatedAt']} 
                                    data={brands.map(brand => {
                        return {
                            'Name': brand.name,
                            'Status': brand.status ? 'Active' : 'Inactive',
                            'CreatedAt': moment(brand.CreatedAt).format('lll'),
                            'UpdatedAt': moment(brand.UpdatedAt).format('lll'),
                            'Actions': <>
                                <Link to={`/brands/${brand._id}/edit`} className="btn btn-dark btn-sm me-2">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(brand._id)}>
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