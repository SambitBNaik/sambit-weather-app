import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./redux/weatherSlice";
import settingReducer from"./redux/settingsSlice";
import favoriteReducer from "./redux/favoriteSlice";

export const store = configureStore({
    reducer:{
        weather: weatherReducer,
        settings:settingReducer,
        favorites: favoriteReducer
    }
});