import { useState, useEffect } from "react";

const UserForm = () => {
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState(user?.password ?? "");

  useEffect(() => {
    fetch(`/account`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);
    
    

  const onSubmit = (e) => {
      e.preventDefault();

  };

  return (
    <form className="UserForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="firstName">First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
        />
      </div>

      <div className="control">
        <label htmlFor="lastName">Last Name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          id="lastName"
        />
      </div>

      <div className="control">
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>

      <div className="buttons">
              <button type="submit" >
                  Submit
        </button>

        <button type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
