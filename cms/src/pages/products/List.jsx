import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { imgUrl } from "../../lib";

export const List = () => {
  const [products, setProducts] = useState([]);
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
              .delete(`cms/products/${id}`)
              .then(() => http.get("cms/products"))
              .then(({ data }) => setProducts(data))
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
      .get("cms/products")
      .then(({ data }) => setProducts(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col xs="auto">
              <Link className="btn btn-dark" to="/products/create">
                <i className="fa-solid fa-plus me-2"></i>Add Product
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
                  data={products.map(product => {
                    return {
                      Name: product.name,
                      Image: (
                        <a href={imgUrl(product.images[0])} target="_blank">
                          <img
                            src={imgUrl(product.images[0])}
                            className="img-sm"></img>
                        </a>
                      ),
                      Category: product.category?.name,
                      Brand: product.brand?.name,
                      Price: product.price,
                      "Dis. Price": product.discounted_price,
                      Status: product.status ? "Active" : "InActive",
                      Featured: product.featured ? "Yes" : "No",
                      "Created At": moment(product.createdAt).format("ll"),
                      "Updated At": moment(product.updatedAt).fromNow(),

                      Actions: (
                        <>
                          <Link
                            to={`${product._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(product._id)}>
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
