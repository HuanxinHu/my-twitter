import { configureStore } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import user from 'redux/User/user.reduces';
import comment from 'redux/Comment/comment.reduces';

const rootReducer = combineReducers({
  user,
  comment,
});

const store = configureStore({
  reducer: rootReducer,
  // TODO: will uncommant this line to disable reudxDevTool browser extension in real production relase
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AppThunkPromise<ReturnType = Promise<AxiosResponse<any> | void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
