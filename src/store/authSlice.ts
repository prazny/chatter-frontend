import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
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

export default authSlice.reducer;
