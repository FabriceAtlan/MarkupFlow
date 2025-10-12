import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Editor from "./pages/EditorPage";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Editor /> },
      { path: "editor", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
