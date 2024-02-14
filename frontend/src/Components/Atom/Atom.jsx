import { atom } from "jotai"
const state = {
    trips: atom([]),
    token: atom(""),
    loggedUser: atom({}),
    isUserLogged: atom(false),
    allMementos: atom([]),
    counter: atom(1), 
    currentTrip: atom({state: false, trip: {}})
}

export default state
