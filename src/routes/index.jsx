import { Dashboard, Users, Field, Projects, EditProject } from '../pages'

export const authRoutes = [
    // {
    //     path: "/",
    //     element: <Login />,

    // },
    // {
    //     path: "/signup",
    //     element: <Signup />,

    // },
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
        path: "/projects/create",
        element: <EditProject />
    },
    {
        path: "/projects/edit/:id",
        element: <EditProject />
    }
]
