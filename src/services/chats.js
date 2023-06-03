import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/chats",
        prepareHeaders: (headers, {getState}) => {
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
            query: (status) => ({
                url: "/",
                method: "GET",
                params: {status}
            }),
            providesTags: ['Chat'],
        }),
        assignChat: builder.mutation({
            query: () => ({
                url: "/",
                method: "POST",
            }),
            invalidatesTags: ['Chat'],
        }),
    }),
});

export const {
    useGetChatsQuery,
    useAssignChatMutation
} = chatsApi;
