import { configureStore } from '@reduxjs/toolkit'
import recieptReducer from "./recieptsSlice"
import dashboardReducer from "./dashboardSlice";
import  authSlice  from './authSlice';
import  productSlice   from './productSlice';


export const store = configureStore({  
  reducer: {
    receiptstate: recieptReducer,
    dashboardState: dashboardReducer,  
    authstate: authSlice ,
    productstate: productSlice
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
