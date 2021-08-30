import { createSlice } from '@reduxjs/toolkit';
import { handleStyleSubmit } from '../apiCalls';

export const AppStates = Object.freeze({
  FIRST_OPENING: 'first-opening-of-avoe',
  RECORDER_START: 'recorder-start',
  RECORDER_STOP: 'recorder-stop',
  RECORDER_RETRY: 'recorder-retry',
  RECORDER_IDLE: 'recorder-idle',
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
  appState: AppStates.FIRST_OPENING,
  audioURL: null,
  audioBase64: '',
  styleSelected: '',
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
    setAudioBase64: (state, action) => {
      state.audioBase64 = action.payload;
    },
    firstOpening: (state, action) => {
      state.appState = AppStates.FIRST_OPENING;
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
    recorderIdle: (state) => {
      state.appState = AppStates.RECORDER_IDLE;
    },
    styleSelectionStart: (state) => {
      state.appState = AppStates.STYLE_SELECTION_START;
    },
    styleSelected: (state, action) => {
      state.appState = AppStates.STYLE_SELECTED;
      state.styleSelected = action.payload;
    },
    styleApplied: async (state) => {
      state.appState = AppStates.STYLE_APPLIED;
      await handleStyleSubmit(state.audioBase64, state.styleSelected);
    },
  },
});

export const {
  setHighLevelState,
  setAudioURL,
  setAudioBase64,
  firstOpening,
  recorderIdle,
  recorderStart,
  recorderStop,
  recorderRetry,
  styleSelectionStart,
  styleSelected,
  styleApplied,
} = applicationSlice.actions;

export default applicationSlice.reducer;
