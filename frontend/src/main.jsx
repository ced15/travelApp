import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import "./index.css";
import Loading from "./Components/Loading/Loading";
import Homepage from "./Components/Homepage/Homepage";
import MyTrips from "./Components/MyTrips/MyTrips";
import Mementos from "./Components/Mementos/Mementos";
import Wishlist from "./Components/Wishlist/Wishlist";
import Discover from "./Components/Discover/Discover";
import Header from "./Components/Homepage/Header/Header";
import MementoForm from "./Components/Mementos/MementoForm";
import AccountSettings from "./Components/Homepage/Header/AccountSettings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <React.Fragment>
            <Header />
            <Homepage />
          </React.Fragment>
        }
      />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/signUp" element={<SignUp />} />

      <Route
        path="/accountSettings"
        element={
          <React.Fragment>
            <Header />
            <AccountSettings />
          </React.Fragment>
        }
      />
      <Route
        path="/myTrips"
        element={
          <React.Fragment>
            <Header />
            <MyTrips />
          </React.Fragment>
        }
      />
      <Route
        path="/mementos"
        element={
          <React.Fragment>
            <Header />
            <Mementos />
          </React.Fragment>
        }
      />
      <Route
        path="/createMemento"
        element={
          <React.Fragment>
            <Header />
            <MementoForm />
          </React.Fragment>
        }
      />
      <Route
        path="/wishlist"
        element={
          <React.Fragment>
            <Header />
            <Wishlist />
          </React.Fragment>
        }
      />
      <Route
        path="/discover"
        element={
          <React.Fragment>
            <Header />
            <Discover />
          </React.Fragment>
        }
      />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
