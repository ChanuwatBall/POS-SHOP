import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';

import {store} from "./store/store"
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);