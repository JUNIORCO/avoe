import { createSlice } from '@reduxjs/toolkit';

export const Status = Object.freeze({
  IDLE: 'idle',
  START: 'start',
  RECORDED: 'recorded',
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
    recorded: (state) => {
      state.status = Status.RECORDED;
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

export const { idle, start, recorded, reset, accept } = recorderSlice.actions;

export default recorderSlice.reducer;
