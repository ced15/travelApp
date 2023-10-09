import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import React from "react";

const LogIn = () => {
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
      });
  };

  return (
    <div className="bg-travelling-start h-screen bg-cover bg-center">
      <div className="flex justify-center items-center h-screen backdrop-blur-sm">
        <form
          className="flex flex-col gap-10 p-4 bg-gradient-to-r from-gray-300 to-gray-900 rounded-lg w-80 z-0 md:filter-none"
          onSubmit={onLogin}
        >
          <label className="text-black -mt-6">Email :</label>
          <input
            value={user.email}
            onChange={handleInputChange}
            name="email"
            id="email"
            type="text"
            className="input -mt-6"
          />

          <label className="text-black -mt-6">Password :</label>
          <input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            id="password"
            type="password"
            className="input -mt-6"
          />

          <button className="mt-2 mb-2 border-2 rounded-lg py-1 px-4 text-lg font-bold text-black-500">
            Log In
          </button>

          <div className="text-black text-center">
            Don't have an account?{" "}
            <span className="font-bold hover:underline cursor-pointer">
              <Link to="/signUp">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LogIn;
