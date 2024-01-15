import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { addFavouriteWord, getContent, getFavouriteWord, deleteFavouriteWord } from "../../services/firebase/firebaseService";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ['Users', 'Favourite', 'Collections'],
    endpoints: (builder) => ({
        // favourite
        getFavouriteWords: builder.query({
            queryFn: async (user) => {
                const data = await getContent("favourites");
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

        // collections
        getCollections: builder.query({
            queryFn: async (user) => {
                const data = await getContent("collections");
                return { data };
            },
            providesTags: ['Collections']
        }),
    })
})

export const { useGetFavouriteWordsQuery, useAddFavouriteWordMutation, useGetFavouriteWordQuery, useDeleteFavouriteWordMutation, useGetCollectionsQuery } = apiSlice;