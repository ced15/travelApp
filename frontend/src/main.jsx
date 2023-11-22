import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from './Components/SignUp/SignUp';
import "./index.css";
import Loading from './Components/Loading/Loading';
import Homepage from './Components/Homepage/Homepage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<LogIn />} /> */}
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/" element={<Homepage />}  />

      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
