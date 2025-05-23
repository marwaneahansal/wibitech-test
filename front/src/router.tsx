import { createBrowserRouter, Navigate, RouteObject } from "react-router";
import { Login } from "./pages/Login";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { Home } from "./pages/Home";

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/tasks"} />,
      },
      {
        path: "/tasks",
        element: <Home />,
      },
    ],
  },
];

export const router = createBrowserRouter([
  ...protectedRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1 className="text-xl">404</h1>,
  },
]);
