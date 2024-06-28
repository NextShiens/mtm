import {createSlice} from '@reduxjs/toolkit';
import {LIGHT} from '../../assets/theme';

const initialState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {updateTheme} = themeSlice.actions;

export default themeSlice.reducer;
