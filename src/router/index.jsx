import GeekLayout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Publish from "@/pages/publish";
import Article from "@/pages/Article";
import AuthRouter from "@/components/AuthRoute";
import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter(
[
    {
        path: "/",
        element: <AuthRouter><GeekLayout /></AuthRouter>,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "article",
                element: <Article />
            },
            {
                path: "publish",
                element: <Publish />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])
export default router;