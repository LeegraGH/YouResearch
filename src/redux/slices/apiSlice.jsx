import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getContent, getFavouriteWord, deleteContent, deleteWordFromCollection, addContent, getCollectionWords, getCollectionWord, addCollectionWord } from "../../services/firebase/firebaseService";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ['Users', 'Favourite', 'Collections', 'CollectionWords'],
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
                return await addContent({ type: "favourites", content: word });
            },
            invalidatesTags: ['Favourite']
        }),
        deleteFavouriteWord: builder.mutation({
            queryFn: async ({ user, wordId }) => {
                return await deleteContent({ type: "favourites", contentId: wordId });
            },
            invalidatesTags: ['Favourite']
        }),

        // collections
        getCollections: builder.query({
            queryFn: async () => {
                const data = await getContent("collections");
                return { data };
            },
            providesTags: ['Collections']
        }),
        createCollection: builder.mutation({
            queryFn: async (collection) => {
                return await addContent({ type: "collections", content: collection });
            },
            invalidatesTags: ['Collections']
        }),
        getCollectionWords: builder.query({
            queryFn: async (collectionId) => {
                const data = await getCollectionWords({ collectionId });
                return { data };
            },
            providesTags: ['CollectionWords']
        }),
        getCollectionWord: builder.query({
            queryFn: async (word) => {
                const data = await getCollectionWord({ word });
                return { data };
            },
            providesTags: ['CollectionWords']
        }),
        deleteCollectionWord: builder.mutation({
            queryFn: async ({ path, wordId }) => {
                return await deleteWordFromCollection({ path, wordId });
            },
            invalidatesTags: ['CollectionWords', 'Collections']
        }),
        createCollectionWord: builder.mutation({
            queryFn: async ({ word, collectionId }) => {
                return await addCollectionWord({ word, collectionId });
            },
            invalidatesTags: ['CollectionWords', 'Collections']
        }),
    })
})

export const { useGetFavouriteWordsQuery, useAddFavouriteWordMutation, useGetFavouriteWordQuery, useDeleteFavouriteWordMutation, useGetCollectionsQuery, useCreateCollectionMutation, useGetCollectionWordsQuery, useGetCollectionWordQuery, useDeleteCollectionWordMutation, useCreateCollectionWordMutation } = apiSlice;