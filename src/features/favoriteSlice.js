import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "weatherFavorites";

const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const loaded = loadFavorites();

const defaultItems = loaded.length > 0 ? loaded : [
  { id: '2643743', name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 }
];

const initialState = {
  items: defaultItems,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(f => f.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(f => f.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
