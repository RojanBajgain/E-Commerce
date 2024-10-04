import { Button, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Error404 = () => {
    const navigate = useNavigate()


    return <Row className="text-center">
        <Col xs={12} className="my-5">
            <h1 className="text-secondary display-1">404</h1>
            <h1 className="text-secondary">Not Found</h1>
        </Col>
        <Col xs={12}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-chevron-left me-2"></i>Go Back
            </Button>
        </Col>
    </Row>
}