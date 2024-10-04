import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"

export const FrontRoutes = () => {
    return <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages.Front.Home />} />

            <Route path="category/:id" element={<Pages.Front.Category />} />

            <Route path="brand/:id" element={<Pages.Front.Brand />} />

            <Route path="product/:id" element={<Pages.Front.Product />} />

            <Route path="search" element={<Pages.Front.Search />} />

            <Route path="register" element={<Pages.Auth.Register />} />
            <Route path="login" element={<Pages.Auth.Login />} />

            <Route path="cart" element={<Pages.Front.Cart />} />

            {/* <Route path="cart" element={<PrivateRoutes element={<Pages.Front.Cart />} />} /> */}

            <Route path="profile" element={<PrivateRoutes element={<Pages.Dashboard />} />} />
          </Route>  

        <Route path="*" element={<Pages.Errors.Error404 />} />

        </Routes>
    </BrowserRouter>
}