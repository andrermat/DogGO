import { configureStore, createSelector } from "@reduxjs/toolkit";
import { sessionSlice, idiomSlice } from "./slices";
import { Idiom, Session } from "./types";

const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        idiom: idiomSlice.reducer
    }
})
//ISTO É PARA LER BOYS SÓ LER LEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRR TIPO USESTATES
const root = createSelector((state:RootReducer) => state, (state:RootReducer) => state)
const sessionSelector = createSelector((state:RootReducer) => state.session, (session:Session) => session)
const idiomSelector = createSelector((state:RootReducer)=> state.idiom, (idiom:Idiom) => idiom)

type RootReducer = ReturnType<typeof store.getState> 
export {store, root, sessionSelector, idiomSelector}
