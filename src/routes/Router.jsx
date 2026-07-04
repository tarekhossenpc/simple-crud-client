import { createBrowserRouter } from "react-router";
import App from "../App";
import UserDetails from "../components/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/users/:id",
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
    Component: UserDetails,
    hydrateFallbackElement:<h2>Please Wait....</h2>
  },
]);
