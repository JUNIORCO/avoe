import { configureStore } from '@reduxjs/toolkit';
import recorderReducer from './reducers/recorderSlice';

const store = configureStore({
  reducer: {
    recorder: recorderReducer
  },
});

export default store;
