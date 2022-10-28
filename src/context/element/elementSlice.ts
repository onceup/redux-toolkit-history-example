import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CircleState, CircleElement } from './types';

const initialState: CircleState = {
  currentCircle: { value: 1 },
};

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    newCurrentElement: (
      state,
      action: PayloadAction<{ newCircle: CircleElement }>
    ) => {
      const { newCircle } = action.payload;
      state.currentCircle = newCircle;
    },
    replaceCurrentElement: (
      state,
      action: PayloadAction<{ newCircle: CircleElement }>
    ) => {
      const { newCircle } = action.payload;
      state.currentCircle = newCircle;
    },
  },
});

export const { newCurrentElement, replaceCurrentElement } =
  elementSlice.actions;

export default elementSlice.reducer;
