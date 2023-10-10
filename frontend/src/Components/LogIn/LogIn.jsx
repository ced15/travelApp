import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [link, setLink] = useState("")
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

    fetch(`http://localhost:8080/account/login/${user.email}/${user.password}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLink("/signUp")
      });
  };

  return (
      <div className="flex relative h-screen justify-end items-center">
        <div className="h-screen login w-full brightness-75"></div>
        <form
          className="absolute flex flex-col gap-10 p-4 bg-gradient-to-r rounded-3xl w-96 z-0 md:filter-none pl-10 right-20 italic bg-gray-500 bg-opacity-40"
          onSubmit={(e) => saveFormData(e)}
        >
          <div className="text-2xl font-bold text-center pr-8 text-white pb-6" >L🦝gin</div>

          <label className="text-white -mt-6">E-mail :</label>
          <input
            value={user.email}
            onChange={handleInputChange}
            name="email"
            id="email"
            type="text"
            className="input -mt-6 w-72 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label className="text-white -mt-6">Password :</label>
          <input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            id="password"
            type="password"
            className="input -mt-6 w-72 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button className="mt-2 mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white w-72  border-white hover:bg-white hover:text-black hover:bg-opacity-40">
            Log-in
          </button>
          <div className="text-white text-left w-72 hover:underline cursor-pointer">
            <Link to="signUp">
              Don't have an account?{" "}
            </Link>
          </div>
        </form>
    </div>
  );
};
export default LogIn;
