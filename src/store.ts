import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ListAccountReducer from './state/ListAccount.slide';
import RoleAuthSlideReducer from './state/Auth.slide';
import ValueSearchReducer from './state/ValueSearch.slide';

export const store = configureStore({
    reducer: {
        ListAccountSlide: ListAccountReducer,
        RoleAuth: RoleAuthSlideReducer,
        ValueSearch: ValueSearchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
