import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import History from './pages/History/History';
import store from './context/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <History></History>
    </Provider>
  </React.StrictMode>
);
