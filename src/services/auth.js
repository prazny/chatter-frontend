import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // include token in req header
       // headers.set("Content-Type", "application/json");
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.query({
      query: () => ({
        url: "/auth/authenticate",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
