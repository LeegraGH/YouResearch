import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slices/wordSlice";
import favouritesReducer from "./slices/favouritesSlice";

const store = configureStore({
    reducer: {
        word: wordReducer,
        favourites: favouritesReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;