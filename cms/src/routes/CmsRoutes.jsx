import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"
import { AdminRoutes } from "./AdminRoutes"

export const CmsRoutes = () => {
    return <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoutes element={<Pages.Dashboard />}/>} />

            <Route path="profile/edit" element={<PrivateRoutes element={<Pages.Profile.Edit />}/>} />
            <Route path="profile/password" element={<PrivateRoutes element={<Pages.Profile.Password />}/>} />

            <Route path="staffs" element={<PrivateRoutes element={<AdminRoutes element={<Outlet />} />} />}>
                <Route index element={<Pages.Staffs.List />} />
                <Route path="create"  element={<Pages.Staffs.Create />} />
                <Route path=":id/edit"  element={<Pages.Staffs.Edit />} />
            </Route>

            <Route path="customers" element={<PrivateRoutes element={<AdminRoutes element={<Outlet />} />} />}>
                <Route index element={<Pages.Customers.List />} />
                <Route path="create"  element={<Pages.Customers.Create />} />
                <Route path=":id/edit"  element={<Pages.Customers.Edit />} />
            </Route>

            <Route path="categories" element={<PrivateRoutes  element={<Outlet />} />}>
                <Route index element={<Pages.Categories.List />} />
                <Route path="create"  element={<Pages.Categories.Create />} />
                <Route path=":id/edit"  element={<Pages.Categories.Edit />} />
            </Route>

            <Route path="brands" element={<PrivateRoutes  element={<Outlet />} />}>
                <Route index element={<Pages.Brands.List />} />
                <Route path="create"  element={<Pages.Brands.Create />} />
                <Route path=":id/edit"  element={<Pages.Brands.Edit />} />
            </Route>

            <Route path="products" element={<PrivateRoutes  element={<Outlet />} />}>
                <Route index element={<Pages.Products.List />} />
                <Route path="create"  element={<Pages.Products.Create />} />
                <Route path=":id/edit"  element={<Pages.Products.Edit />} />
            </Route>

            <Route path="login" element={<Pages.Login />} /> 

            {/* <Route path="orders" element={<PrivateRoutes element={<Pages.Orders />} />} /> */}

          </Route>  

        <Route path="*" element={<Pages.Errors.Error404 />} />

        </Routes>
    </BrowserRouter>
}