import { configureStore } from "@reduxjs/toolkit";

import wordReducer from "./slices/wordSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        word: wordReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;