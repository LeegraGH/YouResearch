import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    getContent,
    getFavouriteWord,
    deleteCollectionWord,
    addContent,
    getCollectionWords,
    getCollectionWord,
    addCollectionWord,
    deleteCollection,
    deleteFavourite
} from "../../services/firebase/firestore/firestoreService";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "/"}),
    tagTypes: ['Users', 'Favourite', 'Collections', 'CollectionWords'],
    endpoints: (builder) => ({

        // favourite
        getFavouriteWords: builder.query({
            queryFn: async (user) => {
                const data = await getContent("favourites");
                return {data};
            },
            providesTags: ['Favourite']
        }),
        getFavouriteWord: builder.query({
            queryFn: async ({user, word}) => {
                const data = await getFavouriteWord({word});
                return {data};
            },
            providesTags: ['Favourite']
        }),
        addFavouriteWord: builder.mutation({
            queryFn: async ({user, word}) => {
                return await addContent({type: "favourites", content: word});
            },
            invalidatesTags: ['Favourite']
        }),
        deleteFavouriteWord: builder.mutation({
            queryFn: async ({user, wordId}) => {
                return await deleteFavourite({contentId: wordId});
            },
            invalidatesTags: ['Favourite']
        }),

        // collections
        getCollections: builder.query({
            queryFn: async () => {
                const data = await getContent("collections");
                return {data};
            },
            providesTags: ['Collections']
        }),
        createCollection: builder.mutation({
            queryFn: async (collection) => {
                return await addContent({type: "collections", content: collection});
            },
            invalidatesTags: ['Collections']
        }),
        deleteCollection: builder.mutation({
            queryFn: async (collectionId) => {
                return await deleteCollection({collectionId});
            },
            invalidatesTags: ['Collections', 'CollectionWords']
        }),

        // collection words
        getCollectionWords: builder.query({
            queryFn: async (collectionId) => {
                const data = await getCollectionWords({collectionId});
                return {data};
            },
            providesTags: ['CollectionWords']
        }),
        getCollectionWord: builder.query({
            queryFn: async (word) => {
                const data = await getCollectionWord({word});
                return {data};
            },
            providesTags: ['CollectionWords']
        }),
        deleteCollectionWord: builder.mutation({
            queryFn: async ({collectionId, wordId}) => {
                return await deleteCollectionWord({collectionId, wordId});
            },
            invalidatesTags: ['CollectionWords']
        }),
        createCollectionWord: builder.mutation({
            queryFn: async ({word, collectionId}) => {
                return await addCollectionWord({word, collectionId});
            },
            invalidatesTags: ['CollectionWords']
        }),
    })
})

export const {
    useGetFavouriteWordsQuery,
    useAddFavouriteWordMutation,
    useGetFavouriteWordQuery,
    useDeleteFavouriteWordMutation,
    useGetCollectionsQuery,
    useCreateCollectionMutation,
    useGetCollectionWordsQuery,
    useGetCollectionWordQuery,
    useDeleteCollectionWordMutation,
    useCreateCollectionWordMutation,
    useDeleteCollectionMutation
} = apiSlice;