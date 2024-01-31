import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import Loading from "../Loading/Loading";
import React from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import supabase from "../../supabase";

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [isUserLogged, setIsUserLogged] = useAtom(state.isUserLogged);

  const [user, setUser] = useState({
    email: "denisa1506@yahoo.com",
    password: "123456",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:8080/api/v1/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        localStorage.setItem("token", data.access_token);

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

        // Call the fetchUserData function
        fetchUserData();

        console.log("You logged in successfully");
        setIsUserLogged(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(`Failed to Log In! ${error.message}`);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex relative h-screen smallestPhone:justify-center tablet:justify-end items-center">
      <img
        src="images/racconnBackground.jpg"
        className="w-full h-screen brightness-75"
      />
      <form
        className="absolute flex flex-col gap-10 p-4 rounded-3xl pl-5 tablet:right-20 tablet:w-80 phone:w-72 w-64 italic bg-gray-500 bg-opacity-40"
        onSubmit={(e) => onLogin(e)}
      >
        <div className="text-2xl font-bold text-center pr-8 text-white pb-6 pl-9">
          L🦝g In
        </div>

        <label className="text-white -mt-6 pl-1">E-mail :</label>
        <input
          value={user.email}
          onChange={handleInputChange}
          name="email"
          id="email"
          type="text"
          className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
        />
        <label className="text-white -mt-6 pl-1">Password :</label>
        <input
          value={user.password}
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
          className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
        />
        <div className="text-white -mt-6 pl-1"> Forgot Password? </div>
        <button className=" -mt-5 mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white tablet:w-72 phone:w-64 w-56 border-white hover:bg-white hover:text-black hover:bg-opacity-40">
          Log-in
        </button>
        <div className=" -mt-8 text-center text-white tablet:w-72 phone:w-64 w-56 hover:underline cursor-pointer">
          <Link to="/signUp">Don't have an account? </Link>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
