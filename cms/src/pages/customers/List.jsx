import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleDelete(id) {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete",
      buttons: [
        {
          label: "yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/customers/${id}`)
              .then(() => http.get("cms/customers"))
              .then(({ data }) => setCustomers(data))
              .catch(err => {})
              .finally(() => setLoading(false));
          },
        },
        { label: "no", onClick: () => {} },
      ],
    });
  }

  useEffect(() => {
    setLoading(true);
    http
      .get("cms/customers")
      .then(({ data }) => setCustomers(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Customers</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  searchable={[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  sortable={[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  data={customers.map(customer => {
                    return {
                      Name: customer.name,
                      Email: customer.email,
                      Phone: customer.phone,
                      Address: customer.address,
                      Status: customer.status ? "Active" : "InActive",
                      "Created At": moment(customer.createdAt).format("ll"),
                      "Updated At": moment(customer.updatedAt).format("ll"),
                      Actions: (
                        <>
                          <Link
                            to={`${customer._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(customer._id)}>
                            <i className="fa-solid fa-trash me-2"></i>Delete
                          </Button>
                        </>
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
