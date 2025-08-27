import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: '', age: 0 };

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
    }
})

export const {setName, setAge, increaseAge} = userSlice.actions;
export default userSlice.reducer