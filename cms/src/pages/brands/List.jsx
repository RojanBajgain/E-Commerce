import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [brands, setBrands] = useState([]);
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
              .delete(`cms/brands/${id}`)
              .then(() => http.get("cms/brands"))
              .then(({ data }) => setBrands(data))
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
      .get("cms/brands")
      .then(({ data }) => setBrands(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Brands</h1>
            </Col>
            <Col xs="auto">
              <Link className="btn btn-dark" to="/brands/create">
                <i className="fa-solid fa-plus me-2"></i>Add Brand
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  searchable={["Name", "Status", "Created At", "Updated At"]}
                  sortable={["Name", "Status", "Created At", "Updated At"]}
                  data={brands.map(brand => {
                    return {
                      Name: brand.name,

                      Status: brand.status ? "Active" : "InActive",
                      "Created At": moment(brand.createdAt).format("ll"),
                      "Updated At": moment(brand.updatedAt).fromNow(),
                      Actions: (
                        <>
                          <Link
                            to={`${brand._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(brand._id)}>
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
