import { Dashboard, Users, Field, Projects, EditProject, Login } from '../pages'
import Leads from '../pages/Leads';

export const authRoutes = [
    {
        path: "/admin/login",
        element: <Login />,

    },
]

export const openRoutes = [];


export const protectedRoutes = [
    {
        path: "/admin/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/admin/users",
        element: <Users />
    },
    {
        path: "/admin/fields",
        element: <Field />
    },
    {
        path: "/admin/projects",
        element: <Projects />
    }
    ,
    {
        path: "/admin/leads",
        element: <Leads />
    }
    ,
    {
        path: "/admin/projects/create",
        element: <EditProject />
    },
    {
        path: "/admin/projects/edit/:id",
        element: <EditProject />
    }
]
