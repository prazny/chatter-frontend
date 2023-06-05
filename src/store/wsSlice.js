import {createSlice} from "@reduxjs/toolkit";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {WS_URL} from "../config";

const initialState = {
    stomp: null,
};

const wsSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        initStomp: (state) => {
            state.stomp = Stomp.over(new SockJS(WS_URL));
        }
    },
    extraReducers: {}
});

export const { initStomp } = wsSlice.actions;
export default wsSlice.reducer;
