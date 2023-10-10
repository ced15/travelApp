import { useState, useEffect } from "react";
import "./LogIn.css"
import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [allUser, setAllUser] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [user, setUser] = useState({
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
  };

  useEffect(() => {
    fetch(`http://localhost:8080/account/getAllUsers`)
      .then((res) => res.json())
      .then((allUser) => {
        setAllUser(allUser);
        console.log(allUser);
      });
  }, []);

  const saveFormData = (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    fetch(`http://localhost:8080/account/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        alert("Your registration was successfully submitted!");
      })
      .catch((error) => {
        alert(`Registration failed! ${error.message}`);
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
