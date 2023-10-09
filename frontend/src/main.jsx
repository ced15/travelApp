import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
// import '../src/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LogIn from "./Components/LogIn/LogIn";
import SignIn from './Components/SignIn/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/singin",
        element: <SignIn />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
