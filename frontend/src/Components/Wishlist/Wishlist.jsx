import { useAtom } from "jotai";
import state from "../Atom/Atom";
import { useEffect } from "react";

const Wishlist = () => {
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);

  useEffect(() => {
    setShowFormAndTrip({ state: false });
  }, []);

  return <div> HELLO WISHLIST </div>;
};
export default Wishlist;
