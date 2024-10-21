import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import http from "../../http";
import { confirmAlert } from "react-confirm-alert";
import { DataTable, Loading } from "../../components";
import moment from "moment";

export const List = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("cms/reviews")
      .then(({ data }) => {
        setReviews(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = id => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item",
      buttons: [
        {
          label: "Yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/reviews/${id}`)
              .then(() => http.get("cms/reviews"))
              .then(({ data }) => setReviews(data))
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

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Reviews</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  searchable={[
                    "User",
                    "Product",
                    "Comment",
                    "Rating",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  data={reviews.map(review => {
                    return {
                      User: review.user?.name || "N/A",
                      Product: review.product?.name || "N/A",
                      Comment: review.comment,
                      Rating: review.rating,

                      "Created At": moment(review.createdAt).format("lll"),
                      "Updated At": moment(review.updatedAt).format("lll"),
                      Actions: (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={ev => handleDelete(review._id)}>
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
