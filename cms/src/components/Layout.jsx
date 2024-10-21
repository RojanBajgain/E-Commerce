import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Layout.css";
import { CmsMenu } from "./CmsMenu";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <CmsMenu></CmsMenu>
      <Outlet></Outlet>
    </>
  );
};
