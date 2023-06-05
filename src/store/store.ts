import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {authApi} from "../services/auth";
import {sitesApi} from "../services/sites";
import {chatsApi} from "../services/chats";

export const store = configureStore({
    reducer: {
        auth: authSlice,
       // ws: wsSlice,
        [authApi.reducerPath]: authApi.reducer,
        [sitesApi.reducerPath]: sitesApi.reducer,
        [chatsApi.reducerPath]: chatsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, sitesApi.middleware, chatsApi.middleware),
});

export default store;
