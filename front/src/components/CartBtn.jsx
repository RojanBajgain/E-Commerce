import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store";
import { toast } from "react-toastify";
import { useState } from "react";

export const CartBtn = ({ product, qty = 1 }) => {
  const cart = useSelector(state => state.cart.value);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCart = () => {
    setLoading(true);
    const id = product._id;
    const price =
      product.discounted_price > 0 ? product.discounted_price : product.price;
    let total = price * qty;
    let newQty = qty;

    if (id in cart) {
      // Product already in cart, update quantity and total
      newQty += cart[id]["qty"];
      total = price * newQty;
    }

    const updatedCart = {
      ...cart,
      [id]: {
        product,
        qty: newQty,
        total,
        price,
      },
    };

    dispatch(setCart(updatedCart));
    setLoading(false);
    toast.success("Product added to cart");
  };

  return (
    <button className="btn btn-outline-dark" type="button" onClick={handleCart}>
      <i
        className={`fas ${
          loading ? "fa-spinner fa-spin" : "fa-cart-plus"
        } me-2`}></i>
      Add To Cart
    </button>
  );
};
