import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIsAuthenticatedFromLS } from 'src/utils/auth';

interface ValueSearch {
    valueSearch: string;
}

const initialState: ValueSearch = {
    valueSearch: getIsAuthenticatedFromLS(),
};

const ValueSearchSlide = createSlice({
    name: 'ValueSearch',
    initialState,
    reducers: {
        setValueSearch: (state, action: PayloadAction<string>) => {
            state.valueSearch = action.payload;
        },
    },
});

export const { setValueSearch } = ValueSearchSlide.actions;
const ValueSearchReducer = ValueSearchSlide.reducer;

export default ValueSearchReducer;
