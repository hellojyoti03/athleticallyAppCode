// features/authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  userToken: null,
  groupChatMessage: [],
  contactGroup: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGroupChatMessage(state, action) {
      state.groupChatMessage = action.payload;
    },
    setUserToken(state, action) {
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

export const {
  setUserToken,
  deleteUserToken,
  setCurrentUser,
  setContactGroup,
  setGroupChatMessage,
} = appSlice.actions;

export default appSlice.reducer;
