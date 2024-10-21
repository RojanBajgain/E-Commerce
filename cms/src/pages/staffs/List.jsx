import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [staffs, setStaffs] = useState([]);
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
              .delete(`cms/staffs/${id}`)
              .then(() => http.get("cms/staffs"))
              .then(({ data }) => setStaffs(data))
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
      .get("cms/staffs")
      .then(({ data }) => setStaffs(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Staffs</h1>
            </Col>
            <Col xs="auto">
              <Link className="btn btn-dark" to="/staffs/create">
                <i className="fa-solid fa-plus me-2"></i>Add Staffs
              </Link>
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
                  data={staffs.map(staff => {
                    return {
                      Name: staff.name,
                      Email: staff.email,
                      Phone: staff.phone,
                      Address: staff.address,
                      Status: staff.status ? "Active" : "InActive",
                      "Created At": moment(staff.createdAt).format("ll"),
                      "Updated At": moment(staff.updatedAt).format("ll"),
                      Actions: (
                        <>
                          <Link
                            to={`${staff._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(staff._id)}>
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
