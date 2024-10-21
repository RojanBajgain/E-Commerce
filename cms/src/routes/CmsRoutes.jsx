import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route
            index
            element={
              <PrivateRoutes
                element={<Pages.Dashboard></Pages.Dashboard>}></PrivateRoutes>
            }></Route>
          <Route
            path="profile/edit"
            element={
              <PrivateRoutes
                element={
                  <Pages.Profile.Edit></Pages.Profile.Edit>
                }></PrivateRoutes>
            }></Route>

          <Route
            path="profile/password"
            element={
              <PrivateRoutes
                element={
                  <Pages.Profile.Password></Pages.Profile.Password>
                }></PrivateRoutes>
            }></Route>

          <Route
            path="staffs"
            element={
              <PrivateRoutes
                element={
                  <AdminRoutes element={<Outlet></Outlet>}></AdminRoutes>
                }></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Staffs.List></Pages.Staffs.List>}></Route>

            <Route
              path="create"
              element={<Pages.Staffs.Create></Pages.Staffs.Create>}></Route>

            <Route
              path=":id/edit"
              element={<Pages.Staffs.Edit></Pages.Staffs.Edit>}></Route>
          </Route>
          <Route
            path="categories"
            element={
              <PrivateRoutes element={<Outlet></Outlet>}></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Categories.List></Pages.Categories.List>}></Route>

            <Route
              path="create"
              element={
                <Pages.Categories.Create></Pages.Categories.Create>
              }></Route>

            <Route
              path=":id/edit"
              element={<Pages.Categories.Edit></Pages.Categories.Edit>}></Route>
          </Route>
          <Route
            path="brands"
            element={
              <PrivateRoutes element={<Outlet></Outlet>}></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Brands.List></Pages.Brands.List>}></Route>

            <Route
              path="create"
              element={<Pages.Brands.Create></Pages.Brands.Create>}></Route>

            <Route
              path=":id/edit"
              element={<Pages.Brands.Edit></Pages.Brands.Edit>}></Route>
          </Route>
          <Route
            path="customers"
            element={
              <PrivateRoutes element={<Outlet></Outlet>}></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Customers.List></Pages.Customers.List>}></Route>
            <Route
              path=":id/edit"
              element={<Pages.Customers.Edit></Pages.Customers.Edit>}></Route>
          </Route>
          <Route
            path="products"
            element={
              <PrivateRoutes element={<Outlet></Outlet>}></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Products.List></Pages.Products.List>}></Route>

            <Route
              path="create"
              element={<Pages.Products.Create></Pages.Products.Create>}></Route>

            <Route
              path=":id/edit"
              element={<Pages.Products.Edit></Pages.Products.Edit>}></Route>
          </Route>
          <Route
            path="reviews"
            element={
              <PrivateRoutes
                element={<Pages.Reviews></Pages.Reviews>}></PrivateRoutes>
            }></Route>
          <Route
            path="orders"
            element={
              <PrivateRoutes
                element={<Pages.Orders></Pages.Orders>}></PrivateRoutes>
            }></Route>
          <Route path="login" element={<Pages.Login></Pages.Login>}></Route>
        </Route>
        <Route path="*" element={<Pages.Errors.Error404></Pages.Errors.Error404>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
