import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "./store";

const initialState = { 
    login: null
}
 
export const authSlice = createSlice({
    name: "authState",
    initialState,
    reducers: { 
      setLogin: (state, action) => {
        state.login = action.payload;
      } 
    }
})
 

export const {
   setLogin , 
} = authSlice.actions;


export const getLogin = (state:RootState) => state.    authstate
.login;

export default authSlice.reducer;
