import { useState, useEffect } from "react";
// import "./LogIn.css"
import React from "react";

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
    <div className="bg-travelling-start h-screen bg-cover bg-center">
      <div className="flex justify-center items-center h-screen backdrop-blur-sm">
        <form
          className="flex flex-col gap-10 p-4 bg-gradient-to-r from-gray-300 to-gray-900 rounded-lg w-80 z-0 md:filter-none"
          onSubmit={(e) => saveFormData(e)}
        >
          <div className="text-2xl font-bold text-center">Login</div>
          <label className="text-black">First Name :</label>
          <input
            value={user.firstName}
            onChange={handleInputChange}
            name="firstName"
            id="firstName"
            type="text"
            className="input -mt-6"
          />

          <label className="text-black -mt-6">Last Name :</label>
          <input
            type="text"
            className="input -mt-6"
            value={user.lastName}
            onChange={handleInputChange}
            name="lastName"
            id="lastName"
          />

          <label className="text-black -mt-6">Email : </label>
          <input
            value={user.email}
            onChange={handleInputChange}
            name="email"
            id="email"
            type="text"
            className="input -mt-6"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label className="text-black -mt-6">Password :</label>
          <input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            id="password"
            type="password"
            className="input -mt-6"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button className="mt-2 mb-2 border-2 rounded-lg py-1 px-4 text-lg font-bold text-black-500">
            Log-in
          </button>
          <div className="text-black text-center">
            Don't have an account?{" "}
            <span className="font-bold hover:underline">Sign-Up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
