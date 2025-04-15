import { createSlice } from "@reduxjs/toolkit"; 
import { RootState } from "./store";
import { StateType } from "../types/statetypes";


const initialState:StateType = {
    productReceipt : [] ,
    receiptTotal: 0 ,
    breakBill:[]
}

export const recieptsSlice = createSlice({
    name: "receiptstate",
    initialState,
    reducers: {
      setProductReceipt: (state, action) => {
        state.productReceipt = action.payload;
      },
      setReceiptTotal: (state, action) => {
        state.receiptTotal = action.payload;
      },
      setBreakBill: (state, action) => {
        state.breakBill = action.payload;
      },
    }
}) 


export const { 
    setProductReceipt ,
    setReceiptTotal,
    setBreakBill 
} = recieptsSlice.actions;


export const getProductReceipt = (state:RootState) => state.receiptstate.productReceipt
export const getReceiptTotal = (state:RootState) => state.receiptstate.receiptTotal
export const getBreakBill = (state:RootState) => state.receiptstate.breakBill


export default recieptsSlice.reducer;
 