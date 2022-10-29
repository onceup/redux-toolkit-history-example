import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CircleState, CircleElement } from './types';

const initialState: CircleState = {
  currentCircle: { value: 1 },
};

//Here we create a new Slice for redux-toolkit with our current element
export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    //Reducer to replace current element with new genereated element from payload
    //This reducer will be listened by our custom history middleware in '../store.ts'
    newCurrentElement: (
      state,
      action: PayloadAction<{ newCircle: CircleElement }>
    ) => {
      const { newCircle } = action.payload;
      state.currentCircle = newCircle;
    },
    //Reducer to replace current element with old element from undo or redo state
    //This reducer will not be listened by our custom history middleware in '../store.ts'
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
