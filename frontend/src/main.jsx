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
import { useAtom } from "jotai";
import { useEffect } from "react";
import supabase from "./supabase";
import state from "./Components/Atom/Atom";
import UpdateTripForm from "./Components/UpdateTripForm/UpdateTripForm";

const Main = () => {
  const [isUserLogged, setIsUserLogged] = useAtom(state.isUserLogged);
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [allMementos, setAllMementos] = useAtom(state.allMementos);

  useEffect(() => {
    fetch(`http://localhost:8080/memento/getAllMementos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllMementos(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(`Failed to create memento! ${error.message}`);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const { data, error } = await supabase
            .from("token")
            .select("user_id")
            .filter("token", "eq", token)
            .single();

          if (error) {
            throw error;
          }

          if (data && data.user_id) {
            const userId = data.user_id;
            const userData = await supabase
              .from("_user")
              .select("id, first_name, last_name, email")
              .eq("id", userId)
              .single();

            if (userData.error) {
              throw userData.error;
            }

            setLoggedUser(userData.data);
            console.log(userData.data);
          } else {
            console.error("No user found for the given token.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };
    fetchUserData();
  }, [setLoggedUser]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsUserLogged(true);
    }
  }, []);

  return (
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
          path="/myTrips/updateTripForm"
          element={
            <React.Fragment>
              <Header />
              <UpdateTripForm />
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
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Main />);
reportWebVitals();
