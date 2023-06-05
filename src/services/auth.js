import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    _prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // include token in req header

        // headers.set("Content-Type", "application/json");
        return headers;
      }
    },
    get prepareHeaders() {
      return this._prepareHeaders;
    },
    set prepareHeaders(value) {
      this._prepareHeaders = value;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
    patchUser: builder.mutation({
      query: ({ password }) => ({
        url: "/user",
        method: "PATCH",
        body: {
          password,
        },
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery, usePatchUserMutation } = authApi;
