import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = 'https://mocki.io/v1/3def0315-946d-45a3-96ea-b2dd40b41c86 '

export const getCities = createAsyncThunk('user/fetchCities', async () => {
    const response = await fetch(API_URL, {method: 'GET', headers: {'Content-Type': 'application/json'}});
    const data = await response.json();
    return data;
})

const initialState = { name: '', age: 0 , cities:[], status:"idle", error:null};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        },
        setAge(state, action) {
            state.age = action.payload;
        },
        increaseAge(state, action) {
            state.age = state.age + 1;
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cities";
      });
  },
})

export const {setName, setAge, increaseAge} = userSlice.actions;
export default userSlice.reducer