import { useAtom } from "jotai";
import state from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
import MementoForm from "./MementoForm";
import { useEffect, useState } from "react";

const Mementos = () => {
  const navigate = useNavigate();
  const [allMementos, setAllMementos] = useAtom(state.allMementos);
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowFormAndTrip({ state: false });
  }, []);

  const navigateToCreateMemento = (event) => {
    setShowForm(true);
  };

  return (
    <div>
      {showForm ? (
        <div>
          (
          <MementoForm
            setShowForm={setShowForm}
            setAllMementos={setAllMementos}
          />
          )
        </div>
      ) : (
        <div className="bg-[url('/images/mementoTravel.jpg')] min-h-screen bg-cover bg-no-repeat bg-fixed grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-1 p-10 pt-20 gap-6">
          <div>
            <div className="flex-shrink-0 m-6 relative overflow-hidden bg-primary-200 rounded-lg shadow-lg">
              <div
                onClick={navigateToCreateMemento}
                className="relative flex items-center p-5 justify-center cursor-pointer"
              >
                <img
                  src="./images/plus.png"
                  className="relative w-80 hover:opacity-80"
                />
              </div>
              <div className="relative text-black px-6 pb-6 mt-6">
                <div className="flex justify-between">
                  <span className="block font-semibold text-xl">
                    Add memento
                  </span>
                </div>
              </div>
            </div>
          </div>
          {allMementos.map((memento) => (
            <div>
              <div className="flex-shrink-0 m-6 relative overflow-hidden bg-primary-200 rounded-lg shadow-lg">
                <div className="relative flex items-center justify-center p-5">
                  <img
                    className="relative w-80"
                    src="images/clock.png"
                    alt=""
                  />
                </div>
                <div className="relative text-black px-6 pb-6 mt-6">
                    <span className="block font-semibold text-xl">
                      {memento.mementoMessage}
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Mementos;
