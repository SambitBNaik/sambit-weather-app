import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchForecast, fetchWeather } from "../services/weatherservice";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async ({ cityId, lat, lon }, { rejectedWithValue }) => {
    try {
      const response = await fetchWeather(lat, lon);
      return { cityId, data: response };
    } catch (error) {
      return rejectedWithValue(error);
    }
  },
  {
    condition: ({ cityId, force }, { getState }) => {
      if (force) return true;
      const { weather } = getState();
      const existing = weather.current[cityId];

      if (
        existing &&
        existing.lastFetched &&
        Date.now() - existing.lastFetched < 60000
      ) {
        return false;
      }
      return true;
    },
  },
);

export const getForecast = createAsyncThunk(
  "weather/getForecast",
  async ({ cityId, lat, lon }, { rejectedWithValue }) => {
    try {
      const response = await fetchForecast(lat, lon);
      return { cityId, data: response };
    } catch (error) {}
  },
  {
    condition: ({ cityId, force }, { getState }) => {
      if (force) return true;
      const { weather } = getState();
      const existing = weather.forecast[cityId];

      if (
        existing &&
        existing.lastFetched &&
        Date.now() - existing.lastFetched < 60000
      ) {
        return false;
      }
      return true;
    },
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: {},
    forecast: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        const { cityId, data } = action.payload;
        state.current[cityId] = { ...data, lastFetched: Date.now() };
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        const { cityId, data } = action.payload;
        state.forecast[cityId] = { ...data, lastFetched: Date.now() };
      });
  },
});

export default weatherSlice.reducer;
