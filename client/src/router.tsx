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
      { index: true, element: <Home /> },
      { path: "editor", element: <Editor /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
