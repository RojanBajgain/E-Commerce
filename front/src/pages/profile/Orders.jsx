import { useEffect, useState } from "react";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import moment from "moment";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    http
      .get("profile/orders")
      .then(({ data }) => {
        setOrders(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
    <DataTable
      searchable={["Status", "Created At", "Updated At"]}
      data={orders.map(order => {
        return {
          Details: (
            <ul>
              {order.details.map(detail => (
                <li key={detail._id}>
                  {detail.qty} X {detail.product.name} @ Rs. {detail.price}
                  Total = {detail.total}
                </li>
              ))}
            </ul>
          ),
          Status: order.status,
          "Created At": moment(order.createdAt).format("lll"),
          "Updated At": moment(order.updatedAt).format("lll"),
        };
      })}></DataTable>
  );
};
