import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const Mementos = () => {
  const [allMementos, setAllMementos] = useAtom(state.allMementos);

  return (
    <div className="inline-grid grid-cols-3 grid-rows-3 pt-20">
      <div>
        <div class="flex-shrink-0 m-6 relative overflow-hidden bg-cyan-600 rounded-lg max-w-xs shadow-lg">
          <div class="relative pt-10 px-10 flex items-center justify-center">
            <div
              class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
             ></div>
            <svg
              enable-background="new 0 0 50 50"
              height="160"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 50 50"
              width="160px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect fill="none" height="100" width="100" />
              <line
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="2"
                x1="100"
                x2="0"
                y1="25"
                y2="25"
              />
              <line
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="2"
                x1="25"
                x2="25"
                y1="0"
                y2="100"
              />
            </svg>
          </div>
          <div class="relative text-white px-6 pb-6 mt-6">
            <div class="flex justify-between">
              <span class="block font-semibold text-xl">Add memento</span>
            </div>
          </div>
        </div>
      </div>
      {allMementos.map((memento) => (

        <div>
          <div class="flex-shrink-0 m-6 relative overflow-hidden bg-cyan-600 rounded-lg max-w-xs shadow-lg">
            <div class="relative pt-10 px-10 flex items-center justify-center">
              <div
                class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              ></div>
              <img class="relative w-40" src="images/clock.png" alt="" />
            </div>
            <div class="relative text-white px-6 pb-6 mt-6">
              <div class="flex justify-between">
                <span class="block font-semibold text-xl">
                  {memento.mementoMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Mementos;
