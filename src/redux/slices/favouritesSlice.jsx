import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import useHttp from "../../hooks/http.hook";

// условно пока так, когда подключу firebase, будут кардинальные изменения

const favouritesAdapter = createEntityAdapter();

export const fetchFavourites = createAsyncThunk(
    "favourites/fetchFavourites",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/favourites");
    }
);

export const addFavourite = createAsyncThunk(
    "favourites/addFavourite",
    async (data) => {
        const { request } = useHttp();
        return await request("http://localhost:3001/favourites", "POST", JSON.stringify(data));
    }
);

// export const deleteFavourite = createAsyncThunk(
//     "favourites/deleteFavourite",
//     async (data) => {
//         const { request } = useHttp();
//         return await request(`http://localhost:3001/favourites/${id}`, "DELETE");
//     }
// );

// const initialState = {
//     data: null,
//     status: "idle"
// }

const initialState = favouritesAdapter.getInitialState({
    status: "idle"
});

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        favouritesDeleted: (state, action) => { favouritesAdapter.removeOne(state, action.payload) }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                favouritesAdapter.setAll(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchFavourites.rejected, (state) => {
                state.status = "error";
            })
            .addCase(addFavourite.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addFavourite.fulfilled, (state, action) => {
                favouritesAdapter.addOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(addFavourite.rejected, (state) => {
                state.status = "error";
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = favouritesSlice;

export default reducer;
// export const { favouritesAdded } = actions;
export const { selectAll } = favouritesAdapter.getSelectors(state => state.favourites);