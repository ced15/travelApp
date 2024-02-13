import { useAtom } from "jotai";
import state from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
import MementoForm from "./MementoForm";
import { useState } from "react";

const Mementos = () => {
  const navigate = useNavigate();
  const [allMementos, setAllMementos] = useAtom(state.allMementos);
  const [showForm, setShowForm] = useState(false)

  const navigateToCreateMemento = (event) => {

    setShowForm(true)
  };

  return (
    <div>
      {showForm ? (
        <div>
          (<MementoForm setShowForm={setShowForm} setAllMementos={setAllMementos} />)
        </div>
      ) : (
        <div className="bg-[url('/images/memento_bk.jpg')] bg-cover bg-no-repeat bg-fixed grid sm:grid-cols-3 2xl:grid-cols-6 lg:grid-cols-4 grid-cols-1  pt-20 gap-6">
          <div>
            <div className="flex-shrink-0 m-6 relative overflow-hidden bg-cyan-600 rounded-lg max-w-xs shadow-lg">
              <div
                onClick={navigateToCreateMemento}
                className="relative flex items-center justify-center"
              >
                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
                <svg
                  fill="#969696"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="160px"
                  height="160px"
                  viewBox="0 0 24 24"
                  xml:space="preserve"
                  stroke="#969696"
                  stroke-width="2"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.1"
                  ></g>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
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
              <div className="flex-shrink-0 m-6 relative overflow-hidden bg-cyan-600 rounded-lg max-w-xs shadow-lg">
                <div className="relative flex items-center justify-center">
                  <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
                  <img
                    className="relative w-40"
                    src="images/clock.png"
                    alt=""
                  />
                </div>
                <div className="relative text-white px-6 pb-6 mt-6">
                  <div className="flex justify-between">
                    <span className="block font-semibold text-xl">
                      {memento.mementoMessage}
                    </span>
                  </div>
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
