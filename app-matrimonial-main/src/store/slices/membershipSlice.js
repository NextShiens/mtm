import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  memberShip: '',
};
export const memberShipSlice = createSlice({
  nme: 'membership',
  initialState,
  reducers: {
    selectMemberShip: (state, action) => {
      state.memberShip = action.payload;
      console.log(state);
    },
  },
});
export const {selectMemberShip} = memberShipSlice.reducer;
export default memberShipSlice.reducer;
