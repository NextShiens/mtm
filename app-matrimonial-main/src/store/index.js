import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/appSlice';
import memberShipReducer from './slices/membershipSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    memberShip: memberShipReducer,
    users: userReducer,
  },
});
