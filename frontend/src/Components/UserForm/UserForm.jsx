import { useState, useEffect } from "react";

const UserForm = () => {
  const [allUser, setAllUser] = useState([]);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    firstName: "Denisa",
    lastName: "Cuta",
    email: "denisacuta@yahoo.com",
    password: "12345",
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
    <form className="UserForm" onSubmit={(e) => saveFormData(e)}>
      <div className="control">
        <label htmlFor="firstName">First Name:</label>
        <input
          value={user.firstName}
          onChange={handleInputChange}
          // value={firstName}
          // onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
        />
      </div>

      <div className="control">
        <label htmlFor="lastName">Last Name:</label>
        <input
          // value={lastName}
          // onChange={(e) => setLastName(e.target.value)}
          value={user.lastName}
          onChange={handleInputChange}
          name="lastName"
          id="lastName"
        />
      </div>

      <div className="control">
        <label htmlFor="email">Email:</label>
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          value={user.email}
          onChange={handleInputChange}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          value={user.password}
          onChange={handleInputChange}
          name="password"
          id="password"
        />
      </div>

      <div className="buttons">
        <button type="submit">Submit</button>

        <button type="button">Cancel</button>
      </div>
    </form>
  );
};

export default UserForm;
