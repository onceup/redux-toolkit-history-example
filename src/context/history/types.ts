import { CircleElement } from '../element/types';

export interface HistoryState {
  undo: CircleElement[];
  redo: CircleElement[];
}
