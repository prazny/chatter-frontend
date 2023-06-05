import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8000/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/auth/register`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/auth/authenticate`,
        { email, password },
        config
      );

      const now = new Date();
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userTokenExpiry", now.getTime() + data.expiresIn);
      return data;
    } catch (error) {
      if (error.response && error.response) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLoginOAuth = (data) => {
  console.log(data);
  const now = new Date();
  localStorage.setItem("userToken", data.token);
  localStorage.setItem("userTokenExpiry", now.getTime() + data.exp);
};
