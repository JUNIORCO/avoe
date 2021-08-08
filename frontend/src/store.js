import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import recorderReducer from './reducers/recorderSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recorder: recorderReducer
  },
});

export default store;
