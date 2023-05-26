import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { authApi } from "../services/auth";
import {sitesApi} from "../services/sites";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [sitesApi.reducerPath]: sitesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, sitesApi.middleware),
});

export default store;
