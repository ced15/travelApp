import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import UpdateTripForm from "../UpdateTripForm/UpdateTripForm";

const MyTrips = () => {
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [loading, setLoading] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setShowFormAndTrip({state: false});
  },[])

  useEffect(() => {
    if (loggedUser.id) {
      setLoading(true);
      fetch(`http://localhost:8080/account/getTrips/${loggedUser.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setMyTrips(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(`Failed to create trip! ${error.message}`);
        });
    }
  }, [loggedUser]);

  return (
    <>
      <div className="bg-cover bg-no-repeat bg-fixed min-h-screen relative pt-24 grid xl:grid-cols-2 2xl:grid-cols-3 gap-20 lg:px-72 md:px-48 sm:px-32 px-16 3xl:px-96 grid-cols-1 bg-clip-border text-gray-700 shadow-lg bg-[url('/images/tripsBackground.jpg')] ">
        {myTrips.map((trip) => (
          <div className="backdrop-blur-md rounded-xl h-fit" key={trip.id}>
            <div className="bg-white relative mx-4 mt-4 overflow-hidden rounded-xl shadow-lg shadow-blue-gray-500/40 max-h-80">
              <img
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                alt="ui/ux review check"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h5 className="block font-sans text-2xl font-bold leading-snug tracking-normal text-white antialiased">
                  {trip.event}
                </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path className="cursor-pointer" style={{fill: "white"}} d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 12 2 C 17.523438 2 22 6.476563 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476563 22 2 17.523438 2 12 C 2 6.476563 6.476563 2 12 2 Z M 12 5.8125 C 11.816406 5.8125 11.664063 5.808594 11.5 5.84375 C 11.335938 5.878906 11.183594 5.96875 11.0625 6.0625 C 10.941406 6.15625 10.851563 6.285156 10.78125 6.4375 C 10.710938 6.589844 10.6875 6.769531 10.6875 7 C 10.6875 7.226563 10.710938 7.40625 10.78125 7.5625 C 10.851563 7.71875 10.941406 7.84375 11.0625 7.9375 C 11.183594 8.03125 11.335938 8.085938 11.5 8.125 C 11.664063 8.164063 11.816406 8.1875 12 8.1875 C 12.179688 8.1875 12.371094 8.164063 12.53125 8.125 C 12.691406 8.085938 12.816406 8.03125 12.9375 7.9375 C 13.058594 7.84375 13.148438 7.71875 13.21875 7.5625 C 13.289063 7.410156 13.34375 7.226563 13.34375 7 C 13.34375 6.769531 13.289063 6.589844 13.21875 6.4375 C 13.148438 6.285156 13.058594 6.15625 12.9375 6.0625 C 12.816406 5.96875 12.691406 5.878906 12.53125 5.84375 C 12.371094 5.808594 12.179688 5.8125 12 5.8125 Z M 10.78125 9.15625 L 10.78125 18.125 L 13.21875 18.125 L 13.21875 9.15625 Z">
                  </path>
                </svg>
              </div>
              <div className="inline-flex w-full justify-between">
                <p className="gap-1.5 font-sans text-lg font-bold leading-relaxed text-white antialiased">
                  Departure
                  <br></br>
                  {trip.departureDate.slice(0, 10)}
                </p>

                <p className="pt-2 text-lg font-bold text-white font-sans">
                  {"->"}
                </p>

                <p className="gap-1.5 font-sans text-lg font-bold leading-relaxed text-white antialiased text-end">
                  Arrival
                  <br></br>
                  {trip.arrivalHomeDate.slice(0, 10)}
                </p>
              </div>
            </div>

            <div className="p-4 pt-3">
              <button
                className="block w-full select-none rounded-xl bg-green-700 py-3.5 px-7 text-center align-middle font-sans text-sm font-extrabold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
                onClick={() => setShowFormAndTrip({state: true, trip: trip})}
              >
                <Link to="/">
                  Edit Trip
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MyTrips;
