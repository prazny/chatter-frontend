import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const sitesApi = createApi({
    reducerPath: "sitesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/sites",
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
        getSites: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ['Site'],
        }),
        postSite: builder.mutation({
            query: ({name, uri}) => ({
                url: "/",
                method: "POST",
                body: {
                    name, uri
                }
            }),
            invalidatesTags: ['Site'],
        }),
        deleteSite: builder.mutation({
            query: (id) => ({
                url: "/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ['Site'],
        })
    }),
});

export const {
    useGetSitesQuery,
    usePostSiteMutation,
    useDeleteSiteMutation
} = sitesApi;
