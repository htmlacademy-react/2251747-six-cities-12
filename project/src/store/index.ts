import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import { redirect } from './middlewares/redirect';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { activeCityState } from './active-city-process/active.city-state';

export const api = createAPI();

export const rootReducer = combineReducers({
  [NameSpace.ActiveCity]: activeCityState.reducer,
  [NameSpace.User]: userProcess.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
