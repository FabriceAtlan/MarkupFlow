import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Editor from "./pages/Editor";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "editor", element: <Editor /> },
    ],
  },
]);

export default router;
