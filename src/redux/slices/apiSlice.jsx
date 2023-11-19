import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { addFavouriteWord, getFavouriteWords, getFavouriteWord, deleteFavouriteWord } from "../../services/firebase/firebaseService";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ['Users', 'Favourite'],
    endpoints: (builder) => ({
        getFavouriteWords: builder.query({
            queryFn: async (user) => {
                const data = await getFavouriteWords();
                return { data };
            },
            providesTags: ['Favourite']
        }),
        getFavouriteWord: builder.query({
            queryFn: async ({ user, word }) => {
                const data = await getFavouriteWord({ word });
                return { data };
            },
            providesTags: ['Favourite']
        }),
        addFavouriteWord: builder.mutation({
            queryFn: async ({ user, word }) => {
                return await addFavouriteWord({ word });
            },
            invalidatesTags: ['Favourite']
        }),
        deleteFavouriteWord: builder.mutation({
            queryFn: async ({ user, wordId }) => {
                return await deleteFavouriteWord({ wordId });
            },
            invalidatesTags: ['Favourite']
        }),
    })
})

export const { useGetFavouriteWordsQuery, useAddFavouriteWordMutation, useGetFavouriteWordQuery, useDeleteFavouriteWordMutation } = apiSlice;