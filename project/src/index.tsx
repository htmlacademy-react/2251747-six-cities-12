import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import { store } from './store';
import { fetchOffersAction } from './store/api-action';
import Header from './components/header/header';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

//store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <Header />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
