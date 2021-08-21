import { createSlice } from '@reduxjs/toolkit';

export const Status = Object.freeze({
  IDLE: 'idle',
  START: 'start',
  STOP: 'stop',
  RESET: 'reset',
  ACCEPT: 'accept',
});

const initialState = {
  status: Status.IDLE,
};

export const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    idle: (state) => {
      state.status = Status.IDLE;
    },
    start: (state) => {
      state.status = Status.START;
    },
    stop: (state) => {
      state.status = Status.STOP;
    },
    reset: (state) => {
      state.status = Status.RESET;
    },
    accept: (state) => {
      state.status = Status.ACCEPT;
    },
  },
});

export const selectStatus = (state) => state.status;

export const { idle, start, stop, reset, accept } = recorderSlice.actions;

export default recorderSlice.reducer;
