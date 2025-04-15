import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "./store";

const initialState = { 
  statusCard: [{number: 0 ,status: 0 }],
  devicesMap:[],
  events:[],
  pieChart:{data:[],colors: ['#5FBF05','#e9b702','#c73f0e','#85807e']},
  realtimeChart:[]
}
 
export const dashboardSlice = createSlice({
    name: "dashboardState",
    initialState,
    reducers: { 
      setStatusCard: (state, action) => {
        state.statusCard = action.payload;
      },
      setDevicesMap: (state, action) => {
        state.devicesMap = action.payload;
      },
      setEvents: (state, action) => {
        state.events = action.payload;
      },
      setPieChart: (state, action) => {
        state.pieChart = action.payload;
      },
      setRealtimeChart: (state, action) => {
        state.realtimeChart = action.payload;
      },
    }
})
 

export const {
   setStatusCard ,
   setDevicesMap , 
   setEvents ,
   setPieChart,
   setRealtimeChart
} = dashboardSlice.actions;


export const getStatusCard = (state:RootState) => state.dashboardState.statusCard;
export const getDeviceMap = (state:RootState) => state.dashboardState.devicesMap;
export const getEvents = (state:RootState) => state.dashboardState.events;
export const getPieChart = (state:RootState) => state.dashboardState.pieChart;

export default dashboardSlice.reducer;
