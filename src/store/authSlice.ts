import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // LOGIN REDUCERS
    // @ts-ignore
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.token;
    },
    // @ts-ignore
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // REGISTER REDUCERS
    // @ts-ignore
    [registerUser.fulfilled]: (
      state: { loading: boolean; success: boolean },
      { payload }: any
    ) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    // @ts-ignore
    [registerUser.pending]: (state: { loading: boolean; error: null }) => {
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [registerUser.rejected]: (
      state: { loading: boolean; error: any },
      { payload }: any
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
