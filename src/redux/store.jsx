import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slices/wordSlice";

const store = configureStore({
    reducer: {
        word: wordReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;