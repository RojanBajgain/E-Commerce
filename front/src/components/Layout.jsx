import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./Layout.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FrontNav } from "./FrontNav";
import { useEffect, useState } from "react";
import { TopNav } from "./TopNav";
import { useSelector } from "react-redux";

export const Layout = () => {
  const cart = useSelector(state => state.cart.value);
  const user = useSelector(state => state.user.value);
  const [term, setTerm] = useState("");
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(cart).length) {
      let qt = 0,
        tl = 0;
      for (let id in cart) {
        (qt += cart[id].qty), (tl += cart[id].total);
      }
      setQty(qt);
      setTotal(tl);
    } else {
      setQty(0);
      setTotal(0);
    }
  }, [cart]);

  useEffect(() => {
    if (term.length) {
      navigate(`/search?term=${term}`, {
        replace: true,
      });
    }
  }, [term]);
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-12">
          <header className="row">
            <div className="col-12 bg-dark py-2 d-md-block d-none">
              <div className="row">
                <div className="col-auto me-auto">
                  <ul className="top-nav">
                    <li>
                      <a href="tel:+123-456-7890">
                        <i className="fa fa-phone-square me-2"></i>+123-456-7890
                      </a>
                    </li>
                    <li>
                      <a href="mailto:mail@ecom.com">
                        <i className="fa fa-envelope me-2"></i>mail@ecom.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-auto">
                  <TopNav></TopNav>
                </div>
              </div>
            </div>

            <div className="col-12 bg-white pt-4">
              <div className="row">
                <div className="col-lg-auto">
                  <div className="site-logo text-center text-lg-left">
                    <Link to="/">E-Commerce</Link>
                  </div>
                </div>
                <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control border-dark"
                          placeholder="Search..."
                          onChange={ev => setTerm(ev.target.value)}
                          required
                        />
                        <button className="btn btn-outline-dark">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-auto text-center text-lg-left header-item-holder">
                  <span id="header-favorite">
                    {user.type === "Customer" && (
                      <Link to="/checkout" className="header-item">
                        <i className="fas fa-shopping-cart me-2"></i>
                      </Link>
                    )}
                  </span>
                  {user.type === "Customer" && (
                    <Link to="cart" className="header-item">
                      <i className="fas fa-shopping-bag me-2"></i>
                      <span id="header-qty" className="me-3">
                        {qty}
                      </span>
                      <i className="fas fa-money-bill-wave me-2"></i>
                      <span id="header-price">Rs. {total}</span>
                    </Link>
                  )}
                </div>
              </div>
              <FrontNav></FrontNav>
            </div>
          </header>
        </div>

        <Outlet></Outlet>

        <div className="col-12 align-self-end">
          <footer className="row">
            <div className="col-12 bg-dark text-white pb-3 pt-5">
              <h4 className="text-center">
                <i className="fa-solid fa-copyright"> Copyright 2024</i>
              </h4>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
