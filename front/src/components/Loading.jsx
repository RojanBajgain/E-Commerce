import { Col, Container, Row } from "react-bootstrap";

export const Loading = () => {
  return (
    <Container>
      <Row>
        <Col className="my-5">
          <p className="fs-3 text-center my-5">
            <i className="fa-solid fa-spinner fa-spin me-3"></i>Loading
          </p>
        </Col>
      </Row>
    </Container>
  );
};
