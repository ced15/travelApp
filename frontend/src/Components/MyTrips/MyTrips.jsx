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
    <div className="relative pt-20 h-screen w-full max-w-96 inline-grid grid-rows-3 grid-cols-4 gap-4 rounded-xl bg-clip-border text-gray-700 shadow-lg">
      <img className="absolute" src="/images/racconnBackground.jpg" />
      {myTrips.map((trip) => (
        <div className="h-fit place-content-center backdrop-blur-2xl bg-white/30">
          <div className="relative  mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="ui/ux review check"
            />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="block font-sans text-2xl font-bold leading-snug tracking-normal text-black antialiased">
                {trip.event}
              </h5>
            </div>
            <p className=" gap-1.5 font-sans text-base font-bold leading-relaxed text-black antialiased">
              {`${trip.departureDate.slice(
                0,
                10
              )} ->  ${trip.arrivalHomeDate.slice(0, 10)}`}
            </p>

            {/* { 
              trip.locationList.map((location) => (
              <p className="block text-base font-bold leading-relaxed text-black antialiased">
                {trip.locationList.length >= 2 ? location.locationName + "..." : location.locationName + " -> "}
              </p>
            ))
            } */}
          </div>

          <div className="p-6 pt-3">
            <button
              className="block w-full select-none rounded-lg bg-green-700 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Edit Trip
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyTrips;
