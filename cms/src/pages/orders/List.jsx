import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import http from "../../http";
import { confirmAlert } from "react-confirm-alert";
import { DataTable, Loading } from "../../components";
import moment from "moment";

export const List = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("cms/orders")
      .then(({ data }) => setOrders(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    http
      .get("cms/orders")
      .then(({ data }) => setOrders(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  const handleDelete = id => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/orders/${id}`)
              .then(() => http.get("cms/orders"))
              .then(({ data }) => setOrders(data))
              .catch(err => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",

          onClick: () => {},
        },
      ],
    });
  };

  const handleUpdate = (ev, id) => {
    const form = { status: ev.target.value };
    http.patch(`cms/orders/${id}`, form).then(fetchOrders);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="bg-body my-3 py-3 rounded-2 shadow-sm">
          <Row>
            <Col>
              <h1>Orders</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  sortable={["Created At", "Updated At"]}
                  searchable={["Created At", "Updated At"]}
                  data={orders?.map(order => {
                    return {
                      Details: (
                        <ul>
                          {order.details.map(detail => (
                            <li key={detail._id}>
                              {detail.qty} @ Rs. {detail.price}= Rs.{" "}
                              {detail.total}
                            </li>
                          ))}
                        </ul>
                      ),
                      User: order.user.name,
                      Status: (
                        <Form.Select
                          name="status"
                          defaultValue={order.status}
                          onChange={ev => handleUpdate(ev, order._id)}>
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Shipping">Shipping</option>
                        </Form.Select>
                      ),
                      "Created At": moment(order.createdAt).format("lll"),
                      "Updated At": moment(order.updatedAt).format("lll"),
                      Actions: (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(order._id)}>
                          <i className="fa-solid fa-trash me-2"></i>Delete
                        </Button>
                      ),
                    };
                  })}></DataTable>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
