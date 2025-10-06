import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
