import React, { useRef } from "react";
import { useAtom } from "jotai";
import state from "../../Atom/Atom";
import { useState } from "react";

const AccountSettings = () => {
  const token = localStorage.getItem("token");
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [avatar, setAvatar] = useAtom(state.avatar);
  const inputRef = useRef(null);

  function handleImageChange(e) {
    e.preventDefault(e);
    const file = inputRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    fetch(`http://localhost:8080/account/addAvatar/${loggedUser.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.imageUrl);
        setAvatar(data.imageUrl);
      })
      .catch((error) => {
        console.error("Error while uploading image:", error);
      });
  }

  const handlePatchRequest = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:8080/account/changePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmationPassword: confirmationPassword,
          }),
        }
      );

      if (response.ok) {
        console.log("Password changed successfully");
      } else {
        console.error(
          "Failed to change password. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="pt-20 flex truncate overflow-hidden justify-center items-center min-h-screen bg-cover bg-no-repeat bg-fixed bg-green-400">
      <div className="w-1/2 bg-white rounded shadow-2xl p-4 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          Account Settings
        </h1>

        <form action="/" method="post">
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              First Name
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              placeholder={loggedUser.first_name}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              Last Name
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              placeholder={loggedUser.last_name}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              Email
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="email"
              placeholder={loggedUser.email}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              Current Password
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              New Password
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              Confirmation Password
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
          </div>
          <h1 className="mb-2 font-bold text-lg text-gray-900">Avatar</h1>
          <div className="inline-flex  mb-4">
            <br></br>

            <input
              className="border py-2 px-3 text-grey-800"
              type="file"
              ref={inputRef}
              name="file"
              accept="image/*"
              id="file"
            />
            <button
              className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-3 rounded"
              onClick={(e) => handleImageChange(e)}
            >
              Add Avatar
            </button>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-bold text-lg text-gray-900">
              Gender
            </label>
            <select className="border py-2 px-3 text-grey-800">
              <option>Male</option>
              <option>Female</option>
              <option>Raccoon</option>
              <option>My little pony</option>
            </select>
          </div>
          <button
            className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-3 rounded"
            type="submit"
            onClick={handlePatchRequest}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default AccountSettings;
