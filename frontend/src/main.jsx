import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from './Components/SignUp/SignUp';
import "./index.css"
import SignUp from "./Components/SignUp/SignUp";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
);
reportWebVitals();
