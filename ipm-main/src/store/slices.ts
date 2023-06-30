import { Idiom, Session } from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialSession: Session = {
    isLogged: false,
    token: "",
    email: "",
    profileImg:""
}
const sessionSlice = createSlice({
    name: "Session",
    initialState: initialSession,
    reducers:{
        login:(state:Session, action:PayloadAction<Session>) => { 
            return action.payload
        },
        logout:() => initialSession,
        resetToken:(state:Session, action:PayloadAction<string>) => {
            state.token = action.payload
            return state
        }
    }
});
const idiomSlice = createSlice({
    name: "Idiom",
    initialState: require("../assets/idioms/pt.json"),
    reducers:{
        changeIdiom:(state:Idiom, action:PayloadAction<Idiom>) => {
            return action.payload
        }
    }
});

export {sessionSlice, idiomSlice}
export const {login,logout,resetToken} = sessionSlice.actions
export const {changeIdiom} = idiomSlice.actions