import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import productReducer from "./feature/products/productSlice"

export const store = configureStore({
    reducer:{
        product : productReducer,
        [api.reducerPath] : api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch



