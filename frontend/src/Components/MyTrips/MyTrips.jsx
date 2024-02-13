import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";
import Loading from "../Loading/Loading";

const MyTrips = () => {
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [loading, setLoading] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="bg-cover bg-no-repeat bg-fixed relative pt-24 p-10 w-full max-w-96 grid sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-12 bg-clip-border text-gray-700 shadow-lg" style={{ backgroundImage: `url('/images/tripsBackground.jpg')` }}>
          {myTrips.map((trip) => (
            <div className="h-fit backdrop-blur-md rounded-xl" key={trip.id}>
              <div className="bg-white relative mx-4 mt-4 overflow-hidden rounded-xl shadow-lg shadow-blue-gray-500/40">
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
                <div className="inline-flex w-full justify-between">
                  <p className="gap-1.5 font-sans text-lg font-bold leading-relaxed text-black antialiased">
                    Departure
                    <br></br>
                    {trip.departureDate.slice(0, 10)}
                  </p>
  
                  <p className="pt-2 text-lg font-bold text-black font-sans">
                    {"->"}
                  </p>
  
                  <p className="gap-1.5 font-sans text-lg font-bold leading-relaxed text-black antialiased text-end">
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
                >
                  Edit Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default MyTrips;
