import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="text-center my-5">
        <Col xs={12}>
          <h1 className="text-secondary display-1">404</h1>
          <h3 className="text-secondary">Not Found</h3>
        </Col>
        <Col xs={12}>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left me-2"></i>Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
