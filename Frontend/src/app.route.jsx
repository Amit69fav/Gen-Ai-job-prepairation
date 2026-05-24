import { createBrowserRouter } from 'react-router-dom'
import { Login } from './features/auth/pages/login'
import { Register } from './features/auth/pages/register'
import Protected from './features/auth/components/protected'
import Home from './features/auth/interview/pages/home'



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"interview/:interviewId",
        element:<Protected><Home /></Protected>
    }
])
