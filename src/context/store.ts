import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
  TypedStartListening,
} from '@reduxjs/toolkit';
import historyReducer, { addUndo } from './history/historySlice';
import elementReducer, { newCurrentElement } from './element/elementSlice';

type StoreStartListening = TypedStartListening<StoreState, StoreDispatch>;
const listenerMiddleware = createListenerMiddleware();
const editorAppListening =
  listenerMiddleware.startListening as StoreStartListening;

editorAppListening({
  matcher: isAnyOf(newCurrentElement),
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    const { element } = listenerApi.getOriginalState();
    element.currentCircle &&
      listenerApi.dispatch(addUndo({ newUndo: element.currentCircle }));
  },
});

export const store = configureStore({
  reducer: {
    element: elementReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
