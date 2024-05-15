import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserAccountType } from 'src/mock/ListAccount';
import { getListAccountUserFromLS } from 'src/utils/ListAccount.Local';

interface ListAccountState {
    ListAccount: UserAccountType[];
}

const initialState: ListAccountState = {
    ListAccount: getListAccountUserFromLS(),
};

const ListAccountSlide = createSlice({
    name: 'ListAccount',
    initialState,
    reducers: {
        // deletePost: (state, action: PayloadAction<string>) => {
        //     const postId = action.payload;
        //     const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
        //     if (foundPostIndex !== -1) {
        //         state.postList.splice(foundPostIndex, 1);
        //     }
        // },
    },
});

export const {} = ListAccountSlide.actions;
const ListAccountReducer = ListAccountSlide.reducer;

export default ListAccountReducer;
