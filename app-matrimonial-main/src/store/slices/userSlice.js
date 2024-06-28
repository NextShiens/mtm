import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
      addUser: (state, action) => {
        state.push(action.payload);
      },
      updateUser: (state, action) => {
        const { key, updatedUser } = action.payload;
        const index = state.findIndex((user) => user.key === key);
        if (index !== -1) {
          state[index] = updatedUser;
        }
      },
      deleteUser: (state, action) => {
        const key = action.payload;
        return state.filter((user) => user.key !== key);
      },
    },
})
export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;