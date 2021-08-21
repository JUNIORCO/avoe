import { createSlice } from '@reduxjs/toolkit';

export const AppStates = Object.freeze({
  RECORDER_IDLE: 'recorder-idle',
  RECORDER_START: 'recorder-start',
  RECORDER_STOP: 'recorder-stop',
  RECORDER_RETRY: 'recorder-retry',
  STYLE_SELECTION_START: 'style-selection-start',
  STYLE_SELECTED: 'style-selected',
  STYLE_APPLIED: 'style-applied',
});

export const HighLevelStates = Object.freeze({
  RECORDER: 'recorder',
  STYLE_SELECTION: 'style-selection',
});

const initialState = {
  highLevelState: HighLevelStates.RECORDER,
  appState: AppStates.RECORDER_IDLE,
  audioURL: null,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setHighLevelState: (state, action) => {
      state.highLevelState = action.payload;
    },
    setAudioURL: (state, action) => {
      state.audioURL = action.payload;
    },
    recorderIdle: (state) => {
      state.appState = AppStates.RECORDER_IDLE;
    },
    recorderStart: (state) => {
      state.appState = AppStates.RECORDER_START;
    },
    recorderStop: (state) => {
      state.appState = AppStates.RECORDER_STOP;
    },
    recorderRetry: (state) => {
      state.appState = AppStates.RECORDER_RETRY;
    },
    styleSelectionStart: (state) => {
      state.appState = AppStates.STYLE_SELECTION_START;
    },
    styleSelected: (state) => {
      state.appState = AppStates.STYLE_SELECTED;
    },
    styleApplied: (state) => {
      state.appState = AppStates.STYLE_APPLIED;
    },
  },
});

export const {
  setHighLevelState,
  setAudioURL,
  recorderIdle,
  recorderStart,
  recorderStop,
  recorderRetry,
  styleSelectionStart,
  styleSelected,
  styleApplied,
} = applicationSlice.actions;

export default applicationSlice.reducer;
