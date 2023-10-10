import { useState, useEffect } from "react";
import "./LogIn.css"
import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [allUser, setAllUser] = useState([]);
  const raccoonSrc = "https://media.discordapp.net/attachments/1080482388221640805/1161225582374309959/i-want-a-photo-whit-a-raccon-on-an-word-map-upscaled_1.jpg?ex=65378699&is=65251199&hm=64f04861b72f365f9cdf1ab95a2b0991c35ed7635edb31345327ab77e93f161d&=&width=722&height=412"
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
      <div className="flex relative h-screen smallestPhone:justify-center tablet:justify-end items-center">
        <img src={raccoonSrc} fill className="w-full h-screen brightness-75"/>
        <form
          className="absolute flex flex-col gap-10 p-4 rounded-3xl pl-5 tablet:right-20 tablet:w-80 phone:w-72 w-64 italic bg-gray-500 bg-opacity-40"
          onSubmit={(e) => saveFormData(e)}
        >
          <div className="text-2xl font-bold text-center pr-8 text-white pb-6 pl-9" >L🦝g  In</div>

          <label className="text-white -mt-6 pl-1">E-mail :</label>
          <input
            value={user.email}
            onChange={handleInputChange}
            name="email"
            id="email"
            type="text"
            className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label className="text-white -mt-6 pl-1">Password :</label>
          <input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            id="password"
            type="password"
            className="input -mt-6 tablet:w-72 phone:w-64 w-56 rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
          />
          {/* {errors.password && <p className="error">{errors.password}</p>} */}
          <div className="text-white -mt-6 pl-1"> Forgot Password? </div>
          <button className=" -mt-5 mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white tablet:w-72 phone:w-64 w-56 border-white hover:bg-white hover:text-black hover:bg-opacity-40">
            Log-in
          </button>
          <div className=" -mt-8 text-center text-white tablet:w-72 phone:w-64 w-56 hover:underline cursor-pointer">
            <Link to="signUp">
              Don't have an account?{" "}
            </Link>
          </div>
        </form>
    </div>
  );
};

export default LogIn;
