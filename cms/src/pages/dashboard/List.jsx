import { Col, Container, Row } from "react-bootstrap";

export const List = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Dashboard</h1>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
