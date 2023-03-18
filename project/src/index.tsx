import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './moks/offers';
import {reviews} from './moks/reviews';

const Setting = {
  PlacesCount: 312,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      placesCount = {Setting.PlacesCount}
      offers = {offers}
      reviews = {reviews}
    />
  </React.StrictMode>,
);
