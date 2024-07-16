import { Dashboard, Users, Field, Projects, EditProject, Login } from '../pages'
import Leads from '../pages/Leads';

export const authRoutes = [
    {
        path: "/",
        element: <Login />,

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
    }
    ,
    {
        path: "/leads",
        element: <Leads />
    }
    ,
    {
        path: "/projects/create",
        element: <EditProject />
    },
    {
        path: "/projects/edit/:id",
        element: <EditProject />
    }
]
