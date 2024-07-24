import { Dashboard, Users, Field, Projects, EditProject, Login, Signup, Products, EditProduct } from '../pages'
import Leads from '../pages/Leads';

export const authRoutes = [
    {
        path: "/",
        element: <Login />,

    },
    {
        path: "/register",
        element: <Signup />,

    },
]

export const openRoutes = [];


export const protectedRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <Users />
    },
    {
        path: "/fields",
        element: <Field />
    },
    {
        path: "/projects",
        element: <Projects />
    },
    {
        path: "/projects/create",
        element: <EditProject />
    },
    {
        path: "/projects/edit/:projectId",
        element: <EditProject />
    }
    ,
    {
        path: "/leads",
        element: <Leads />
    },
    {
        path: "/products",
        element: <Products />
    }
    ,
    {
        path: "/products/create/:projectId",
        element: <EditProduct />
    },
    {
        path: "/products/edit/:productId",
        element: <EditProduct />
    }

]
