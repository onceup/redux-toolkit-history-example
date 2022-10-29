import { configureStore, createListenerMiddleware, isAnyOf, TypedStartListening } from '@reduxjs/toolkit';
import historyReducer, { addUndo } from './history/historySlice';
import elementReducer, { newCurrentElement } from './element/elementSlice';

type StoreStartListening = TypedStartListening<StoreState, StoreDispatch>;
const listenerMiddleware = createListenerMiddleware();
const editorAppListening = listenerMiddleware.startListening as StoreStartListening;
//Here we are implementing our own middleware to listen for actions to write into the undo state
editorAppListening({
  //After one of actions below happened, we write current element to the undo state before we rewrite it
  matcher: isAnyOf(newCurrentElement),
  effect: async (_action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    //Getting the current element from the element store
    const { element } = listenerApi.getOriginalState();
    //Adding the current element to the undo state
    element.currentCircle && listenerApi.dispatch(addUndo({ newUndo: element.currentCircle }));
  },
});

export const store = configureStore({
  reducer: {
    element: elementReducer,
    history: historyReducer,
  },
  //Registering our middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
