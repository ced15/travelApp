import { atom } from "jotai"
const state = {
    trips: atom([]),
    token: atom(""),
    loggedUser: atom({}),
    isUserLogged: atom(false),
    allMementos: atom([])
}

export default state
