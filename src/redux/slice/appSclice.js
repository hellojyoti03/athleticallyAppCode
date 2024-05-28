// features/authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  userToken: null,
  contactGroup: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserToken(state, action) {
      console.log('setr action ac', action.payload);
      state.userToken = action.payload;
    },
    deleteUserToken(state) {
      state.userToken = null;
    },
    setContactGroup(state, action) {
      state.contactGroup = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const {setUserToken, deleteUserToken, setCurrentUser, setContactGroup} =
  appSlice.actions;

export default appSlice.reducer;
