import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newCurrentElement } from '../element/elementSlice';
import { CircleElement } from '../element/types';
import { HistoryState } from './types';

const initialState: HistoryState = {
  undo: [],
  redo: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.undo = [];
      state.redo = [];
    },
    addUndo: (state, action: PayloadAction<{ newUndo: CircleElement }>) => {
      const { newUndo } = action.payload;
      state.undo.push(newUndo);
    },
    addRedo: (state, action: PayloadAction<{ newRedo: CircleElement }>) => {
      const { newRedo } = action.payload;
      state.redo.push(newRedo);
    },
    popUndo: (state, action: PayloadAction<{ currentCircle: CircleElement }>) => {
      const { currentCircle } = action.payload;
      const poppedItem = state.undo.pop();
      poppedItem && state.redo.push(currentCircle);
    },
    popRedo: (state, action: PayloadAction<{ currentCircle: CircleElement }>) => {
      const { currentCircle } = action.payload;
      const poppedItem = state.redo.pop();
      poppedItem && state.undo.push(currentCircle);
    },
  },
  //Here we are listening for dispatching action 'newCurrentElement' and clearing redo state after it's dispatch
  extraReducers: (builder) => {
    builder.addCase(newCurrentElement, (state) => {
      state.redo = [];
    });
  },
});

export const { clearHistory, addUndo, addRedo, popUndo, popRedo } = historySlice.actions;

export default historySlice.reducer;
