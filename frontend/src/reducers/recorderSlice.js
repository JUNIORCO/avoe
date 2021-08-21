import { createSlice } from '@reduxjs/toolkit';

export const Status = Object.freeze({
  IDLE: 'idle',
  START: 'start',
  STOP: 'stop',
  RETRY: 'retry',
  NEXT: 'next',
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
    retry: (state) => {
      state.status = Status.RETRY;
    },
    next: (state) => {
      state.status = Status.NEXT;
    },
  },
});

export const selectStatus = (state) => state.status;

export const { idle, start, stop, retry, next } = recorderSlice.actions;

export default recorderSlice.reducer;
