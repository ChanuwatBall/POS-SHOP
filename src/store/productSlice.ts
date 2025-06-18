import { createSlice } from "@reduxjs/toolkit"; 
import { RootState } from "./store";
import { StateType } from "../types/statetypes";


const initialState = { 
    productsBackup:[
      { id: 23 ,name:"Soap" ,unitPrice: 18.00 , instock: 20  ,categories: [1 ,3 ]},
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00  , instock: 20 ,categories: [1 ,3 ]},
      { id: 67 ,name:"แปรงสีฟัน" ,unitPrice: 15.00  , instock: 20,categories: [1 ,3 ]}, 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00  , instock: 20,categories: [1 ,3 ]},
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00  , instock: 20,categories: [1 ,3 ]},
      { id: 35 ,name:"เลย์ ดั้งเดิมแผ่นหยัก 20g."  ,unitPrice: 6.00  , instock: 20,categories: [1 , 2]},
    ],
    products:[
      { id: 23 ,name:"Soap" ,unitPrice: 18.00 , instock: 20  ,categories: [1 ,3 ]},
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00  , instock: 20 ,categories: [1 ,3 ]},
      { id: 67 ,name:"แปรงสีฟัน" ,unitPrice: 15.00  , instock: 20,categories: [1 ,3 ]}, 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00  , instock: 20,categories: [1 ,3 ]},
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00  , instock: 20,categories: [1 ,3 ]},
      { id: 35 ,name:"เลย์ ดั้งเดิมแผ่นหยัก 20g."  ,unitPrice: 6.00  , instock: 20,categories: [1 , 2]},
    ],
    categories:[
      {id:1 ,name:"Favorite" } ,
      {id:2 ,name:"ขนม-เครื่องดื่ม" } ,
      {id:3 ,name:"ของใช้" } ,
    ] ,
}

export const productSlice = createSlice({
    name: "productstate",
     initialState,
    reducers: {
       setCatagories: (state, action) => {
        state.categories = action.payload;
       },
       setProducts: (state, action) => {
        state.products = action.payload;
       },
    }
})

export const {  
    setCatagories ,
    setProducts
} = productSlice.actions;


export const getCatagories= (state:RootState) => state.productstate.categories
export const getProducts= (state:RootState) => state.productstate.products
export const getProductsBackup= (state:RootState) => state.productstate.productsBackup


export default productSlice.reducer;