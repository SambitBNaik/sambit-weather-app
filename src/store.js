import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherSlice";
import settingReducer from"./features/settingsSlice";
import favoriteReducer from "./features/favoriteSlice";

export const store = configureStore({
    reducer:{
        weather: weatherReducer,
        settings:settingReducer,
        favorites: favoriteReducer
    }
});