import { Col, Row } from "react-bootstrap";

export const Loading = () => <Row>
    <Col className="my-3">
        <h5 className="text-center">
            <i className="fa-solid fa-spinner fa-spin me-2"></i>Loading
        </h5>
    </Col>
</Row>