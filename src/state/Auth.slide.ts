import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIsAuthenticatedFromLS, setIsAuthenticatedToLS } from 'src/utils/auth';

interface AuthState {
    roleAuth: string;
}

const initialState: AuthState = {
    roleAuth: getIsAuthenticatedFromLS(),
};

const RoleAuthSlide = createSlice({
    name: 'ListAccount',
    initialState,
    reducers: {
        setRoleAuth: (state, action: PayloadAction<string>) => {
            state.roleAuth = action.payload;
            setIsAuthenticatedToLS(action.payload);
        },
    },
});

export const { setRoleAuth } = RoleAuthSlide.actions;
const RoleAuthSlideReducer = RoleAuthSlide.reducer;

export default RoleAuthSlideReducer;
