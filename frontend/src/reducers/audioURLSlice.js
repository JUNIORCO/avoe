import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioURL: '',
};

export const audioURLSlice = createSlice({
  name: 'audioURL',
  initialState,
  reducers: {
    setAudioURL: (state, action) => {
      state.audioURL = action.payload;
    },
  },
});

export const selectAudioURL = (state) => state.audioURL;

export const { setAudioURL } = audioURLSlice.actions;

export default audioURLSlice.reducer;
