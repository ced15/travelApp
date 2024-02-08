import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../Atom/Atom";

const Mementos = () => {

    const [allMementos, setAllMementos] = useAtom(state.allMementos);

    return (
        <div> 
            {allMementos.map((memento) => 
                <div key={memento.id}> {memento.mementoMessage}</div>
            )}
         </div>
    );
}
export default Mementos;