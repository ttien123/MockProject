import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserAccountType } from 'src/mock/ListAccount';
import {
    getListAccountUserFromLS,
    getUserInfoFromLS,
    setListAccountUserToLS,
    setUserInfoToLS,
} from 'src/utils/ListAccount.Local';

interface ListAccountState {
    ListAccount: UserAccountType[];
    emailForgot: string;
    userInfo: UserAccountType;
}

const initialState: ListAccountState = {
    ListAccount: getListAccountUserFromLS(),
    emailForgot: '',
    userInfo: getUserInfoFromLS(),
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
        setUserInfo: (state, action: PayloadAction<UserAccountType>) => {
            state.userInfo = action.payload;
            setUserInfoToLS(action.payload);
        },
    },
});

export const { setEmailForgot, setListAccount, setUserInfo } = ListAccountSlide.actions;
const ListAccountReducer = ListAccountSlide.reducer;

export default ListAccountReducer;
