import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/chats",
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
    getChats: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => ({
        url: "/" + id,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: (id) => ({
        url: "/" + id + "/mess",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    assignChat: builder.mutation({
      query: (id) => ({
        url: "/" + id + "/assign",
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
    endChat: builder.mutation({
      query: (id) => ({
        url: "/" + id + "/end",
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetMessagesQuery,
  useAssignChatMutation,
  useLazyGetMessagesQuery,
  useEndChatMutation,
} = chatsApi;
