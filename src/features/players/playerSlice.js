import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getPlayers = createAsyncThunk(
  "players/getPlayers",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/players/`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const playerSlice = createSlice({
  name: 'players',
  initialState: {
    players: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false
      })
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.players = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getPlayers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
})

export const selectPlayers = state => state.players;
export const selectLoadingState = state => state.isLoading;
export const selectHasError = state => state.hasError;

export default playerSlice.reducer;