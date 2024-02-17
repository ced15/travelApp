import { useAtom } from "jotai";
import state from "../Atom/Atom";
import { useEffect } from "react";

const Wishlist = () => {
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);

  useEffect(() => {
    setShowFormAndTrip({ state: false });
  }, []);

  const handyRaccoon = "./images/handyRaccoon.png";

  return (
    <div className="bg-primary-200 w-full h-screen flex flex-col items-center justify-center">
      <img src="https://www.svgrepo.com/show/426192/cogs-settings.svg" alt="Logo" className="lg:mb-8 lg:h-40 h-0"/>
      <div className="text-black text-center p-8">
        <h1 className="text-5xl">
          We are <b>Almost</b> there!
        </h1>
        <p>Stay tuned for something amazing!!!</p>

        <div className="mt-10 mb-5">
          <div className="shadow w-full bg-white mt-2 max-w-2xl mx-auto rounded-full relative">
            <div
              className="rounded-full bg-primary-50 text-xs leading-none text-center text-white py-1"
              style={{ width: "75%" }}
            >
              75%
            </div>
          </div>
        </div>
      </div>
      <img
        src={handyRaccoon}
        className="absolute lg:right-30 lg:right-80 lg:top-56 2xl:right-80 2xl:top-80 h-72 sm:top-36 top-28"
        alt="Handy Raccoon"
      />
    </div>
  );
};
export default Wishlist;
