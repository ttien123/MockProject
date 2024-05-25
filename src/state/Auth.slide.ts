import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIsAuthenticatedFromLS, setIsAuthenticatedToLS } from 'src/utils/auth';

interface AuthState {
    roleAuth: 'admin' | 'user' | '';
}

const initialState: AuthState = {
    roleAuth: getIsAuthenticatedFromLS(),
};

const RoleAuthSlide = createSlice({
    name: 'RoleAuth',
    initialState,
    reducers: {
        setRoleAuth: (state, action: PayloadAction<'user' | 'admin' | ''>) => {
            state.roleAuth = action.payload;
            setIsAuthenticatedToLS(action.payload);
        },
    },
});

export const { setRoleAuth } = RoleAuthSlide.actions;
const RoleAuthSlideReducer = RoleAuthSlide.reducer;

export default RoleAuthSlideReducer;
