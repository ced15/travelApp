import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import React from "react";
import Loading from "../Loading/Loading";

const SignUp = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);
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

  useEffect(() => {
    fetch(`http://localhost:8080/account/getAllUsers`)
      .then((res) => res.json())
      .then((allUser) => {
        setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div class="h-screen font-sans login bg-cover">
      <div class="container mx-auto h-full flex flex-1 justify-center items-center">
        <div class="w-full max-w-lg">
          <div class="leading-loose">
            <form
              className="absolute flex flex-col gap-6 p-4 bg-gradient-to-r rounded-3xl setWidth z-0 md:filter-none md:pl-10 right-4 italic bg-gray-500 bg-opacity-40"
              onSubmit={(e) => saveFormData(e)}
            >
              <div className="text-2xl font-bold text-center pr-8 text-white pb-6">
                Sign🦝Up
              </div>

              <label className="text-white">First Name :</label>
              <input
                value={user.firstName}
                onChange={handleInputChange}
                name="firstName"
                id="firstName"
                type="text"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
              />
              
              <label className="text-white">Last Name :</label>
              <input
                type="text"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
                value={user.lastName}
                onChange={handleInputChange}
                name="lastName"
                id="lastName"
              />

              <label className="text-white">E-mail :</label>
              <input
                value={user.email}
                onChange={handleInputChange}
                name="email"
                id="email"
                type="text"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <label className="text-white">Password :</label>
              <input
                value={user.password}
                onChange={handleInputChange}
                name="password"
                id="password"
                type="password"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
              />
              {errors.password && <p className="error">{errors.password}</p>}
              {/* <div className="text-white">Forgot Password?</div> */}
              <button className="mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white w-full border-white hover:bg-white hover:text-black hover:bg-opacity-40">
                Sign-Up
              </button>
              <div className="text-center text-white hover:underline cursor-pointer">
                <Link to="/logIn">Do you have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
