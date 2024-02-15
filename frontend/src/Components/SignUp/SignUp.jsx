import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import React from "react";
import Loading from "../Loading/Loading";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import supabase from "../../supabase";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [isUserLogged, setIsUserLogged] = useAtom(state.isUserLogged);
  const [user, setUser] = useState({
    firstName: "Denisa",
    lastName: "Cuta",
    email: "denisacuta@yahoo.com",
    password: "12345",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    if (name === "email") {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(value) && value !== "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }
    if (name === "password") {
      if (value.length < 6 && value.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 6 characters long",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const saveFormData = (e) => {
    e.preventDefault();
    setLoading(true);
    if (errors.email || errors.password) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    fetch(`http://localhost:8080/api/v1/auth/register`, {
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
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        console.log("Your registration was successfully submitted!");
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

        fetchUserData();
        setIsUserLogged(true);
        navigate("/homepage");
      })
      .catch((error) => {
        console.log(`Registration failed! ${error.message}`);
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
        onSubmit={(e) => saveFormData(e)}
      >
        <div className="text-2xl font-bold text-center pr-8 text-white pb-6 pl-9">
          Sign🦝Up
        </div>

        <label className="text-white -mt-6 pl-1">First Name :</label>
        <input
          value={user.firstName}
          onChange={handleInputChange}
          name="firstName"
          id="firstName"
          type="text"
          className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
        />

        <label className="text-white -mt-6 pl-1">Last Name :</label>
        <input
          type="text"
          className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
          value={user.lastName}
          onChange={handleInputChange}
          name="lastName"
          id="lastName"
        />

        <label className="text-white -mt-6 pl-1">E-mail :</label>
        <input
          value={user.email}
          onChange={handleInputChange}
          name="email"
          id="email"
          type="text"
          className="iinput -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label className="text-white -mt-6 pl-1">Password :</label>
        <input
          value={user.password}
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
          className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button className="mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white w-full border-white hover:bg-white hover:text-black hover:bg-opacity-40">
          Sign-Up
        </button>
        <div className="text-center text-white hover:underline cursor-pointer">
          <Link to="/">Do you have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
