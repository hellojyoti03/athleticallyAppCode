// store.js
import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../slice/appSclice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
store.subscribe(() => {
  // console.log('Store updated:', store.getState());
});
export default store;
