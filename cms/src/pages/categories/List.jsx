import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'

export const List = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('cms/categories')
        .then(({data}) => setCategories(data))
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

                        http.delete(`cms/categories/${id}`)
                            .then(() => http.get('cms/categories'))
                            .then(({data}) => setCategories(data))
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
                    <h1>Category</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/categories/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Staff
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {loading ? <Loading/> : 
                        <DataTable sortable={['Name', 'Status', 'CreatedAt', 'UpdatedAt']} 
                                serachable={['Name', 'Status', 'CreatedAt', 'UpdatedAt']} 
                                    data={categories.map(category => {
                        return {
                            'Name': category.name,
                            'Status': category.status ? 'Active' : 'Inactive',
                            'CreatedAt': moment(category.CreatedAt).format('lll'),
                            'UpdatedAt': moment(category.UpdatedAt).format('lll'),
                            'Actions': <>
                                <Link to={`/categories/${category._id}/edit`} className="btn btn-dark btn-sm me-2">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(category._id)}>
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