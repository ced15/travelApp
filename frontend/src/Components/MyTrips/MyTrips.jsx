import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const MyTrips = () => {
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [myTrips, setMyTrips] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8080/account/getTrips/${loggedUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyTrips(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(`Failed to create memento! ${error.message}`);
      });
  }, []);

  return (
    <div>
      {myTrips.map((trip) => (
        <div className="pt-20" key={trip.id}> {trip.event}</div>
      ))}
    </div>
  );
};
export default MyTrips;
