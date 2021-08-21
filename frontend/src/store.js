import { configureStore } from '@reduxjs/toolkit';
import recorderReducer from './reducers/recorderSlice';
import audioURLReducer from './reducers/audioURLSlice';

const store = configureStore({
  reducer: {
    recorder: recorderReducer,
    audioURL: audioURLReducer,
  },
});

export default store;
