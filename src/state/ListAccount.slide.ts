import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserAccountType } from 'src/mock/ListAccount';
import { getListAccountUserFromLS, setListAccountUserToLS } from 'src/utils/ListAccount.Local';

interface ListAccountState {
    ListAccount: UserAccountType[];
    emailForgot: string;
}

const initialState: ListAccountState = {
    ListAccount: getListAccountUserFromLS(),
    emailForgot: '',
};

const ListAccountSlide = createSlice({
    name: 'ListAccount',
    initialState,
    reducers: {
        setEmailForgot: (state, action: PayloadAction<string>) => {
            state.emailForgot = action.payload;
        },
        setListAccount: (state, action: PayloadAction<UserAccountType[]>) => {
            state.ListAccount = action.payload;
            setListAccountUserToLS(action.payload);
        },
    },
});

export const { setEmailForgot, setListAccount } = ListAccountSlide.actions;
const ListAccountReducer = ListAccountSlide.reducer;

export default ListAccountReducer;
