import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import Loading from "../Loading/Loading"
import React from "react";

const LogIn = () => {
    // const [loading, setLoading] = useState(true);
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
        // setLink("/signUp")
      });
  };

    // if (loading) {
    //   return <Loading />;
    // }

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
                L🦝g In
              </div>

              <label className="text-white">E-mail :</label>
              <input
                value={user.email}
                onChange={handleInputChange}
                name="email"
                id="email"
                type="text"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90 tracking-widest"
              />

              <label className="text-white">Password :</label>
              <input
                value={user.password}
                onChange={handleInputChange}
                name="password"
                id="password"
                type="password"
                className="input w-full rounded-2xl pl-2 h-8 border-2 bg-white bg-opacity-90"
              />
              <div className="text-white">Forgot Password?</div>
              <button className="mb-2 border-2 rounded-xl py-1 px-4 text-lg font-bold text-white w-full border-white hover:bg-white hover:text-black hover:bg-opacity-40">
                Log-in
              </button>
              <div className="text-center text-white hover:underline cursor-pointer">
                <Link to="/signUp">Don't have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
