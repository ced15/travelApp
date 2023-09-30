import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import Login from "./Components/Login";
import SingUp from "./Components/Sing-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <Login />,
      // },
      {
        path: "/singin",
        element: <SingUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
