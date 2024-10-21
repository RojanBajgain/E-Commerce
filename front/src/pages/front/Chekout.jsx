import { useEffect, useState } from "react";
import http from "../../http";
import { DataTable, FormField, Loading, SubmitBtn } from "../../components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setInForm } from "../../lib";
import { Form } from "react-bootstrap";
import CryptoJS from "crypto-js"; // Ensure this is imported

export const Checkout = () => {
  const cart = useSelector(state => state.cart.value);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length) {
      setForm({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    http
      .get("profile/orders")
      .then(({ data }) => {
        setOrders(data);
        let tl = 0;
        data.forEach(order => {
          order.details.forEach(detail => {
            tl += detail.total;
          });
        });
        setTotal(tl);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .patch("profile/edit-profile", form)
      .then(() =>
        http.get("profile/detail").then(({ data }) => {
          dispatch(setUser(data));
        })
      )
      .catch(err => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uuid = Date.now();
  const message = `total_amount=${total},transaction_uuid=${uuid},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  const formattedTotal = total.toLocaleString("en-IN", {
    style: "currency",
    currency: "NPR",
  });

  return loading ? (
    <Loading />
  ) : (
    <div className="row">
      <div className="col-md-5 m-2">
        <Form onSubmit={handleSubmit}>
          <FormField title="name" label="Name">
            <Form.Control
              type="text"
              name="name"
              id="name"
              required
              defaultValue={form.name}
              onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
          </FormField>
          <FormField title="phone" label="Phone">
            <Form.Control
              type="text"
              name="phone"
              id="phone"
              required
              defaultValue={form.phone}
              onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
          </FormField>
          <FormField title="address" label="Address">
            <Form.Control
              as="textarea"
              name="address"
              id="address"
              required
              defaultValue={form.address}
              onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
          </FormField>
          <div className="mb-3">
            <SubmitBtn loading={loading}></SubmitBtn>
          </div>
        </Form>
      </div>
      <div className="col-md-6 m-2">
        <DataTable
          searchable={["Status", "Created At", "Updated At"]}
          data={orders.map(order => {
            return {
              Details: (
                <ul>
                  {order.details.map(detail => (
                    <li key={detail._id}>
                      {detail.qty} X {detail.product.name} @ Rs.{" "}
                      {detail.price} Total = {detail.total}
                    </li>
                  ))}
                </ul>
              ),
              "Created At": moment(order.createdAt).format("lll"),
              "Updated At": moment(order.updatedAt).format("lll"),
            };
          })}
        />
        <p>{formattedTotal}</p>
        <div>
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST">
            <input
              type="hidden"
              id="amount"
              name="amount"
              value={total}
              required
            />
            <input
              type="hidden"
              id="tax_amount"
              name="tax_amount"
              value="0"
              required
            />
            <input
              type="hidden"
              id="total_amount"
              name="total_amount"
              value={total}
              required
            />
            <input
              type="hidden"
              id="transaction_uuid"
              name="transaction_uuid"
              value={uuid}
              required
            />
            <input
              type="hidden"
              id="product_code"
              name="product_code"
              value="EPAYTEST"
              required
            />
            <input
              type="hidden"
              id="product_service_charge"
              name="product_service_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="product_delivery_charge"
              name="product_delivery_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="success_url"
              name="success_url"
              value="http://localhost:7000"
              required
            />
            <input
              type="hidden"
              id="failure_url"
              name="failure_url"
              value="https://google.com"
              required
            />
            <input
              type="hidden"
              id="signed_field_names"
              name="signed_field_names"
              value="total_amount,transaction_uuid,product_code"
              required
            />
            <input
              type="hidden"
              id="signature"
              name="signature"
              value={hashInBase64}
              required
            />
            <SubmitBtn label="Pay with Esewa" />
          </form>
        </div>
      </div>
    </div>
  );
};
