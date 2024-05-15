import { createReducer, createAction, current, PayloadAction, nanoid, createSlice } from '@reduxjs/toolkit';

interface BlogState {
    postList: Post[];
    editingPost: Post | null;
}

const initialState: BlogState = {
    postList: initalPostList,
    editingPost: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        deletePost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
            if (foundPostIndex !== -1) {
                state.postList.splice(foundPostIndex, 1);
            }
        },
        startEditingPost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            const foundPost = state.postList.find((post) => post.id === postId) || null;
            state.editingPost = foundPost;
        },
        cancelEditingPost: (state) => {
            state.editingPost = null;
        },
        finishEditingPost: (state, action: PayloadAction<Post>) => {
            const postId = action.payload.id;
            state.postList.some((post, index) => {
                if (post.id === postId) {
                    state.postList[index] = action.payload;
                    return true;
                }
                return false;
            });
            state.editingPost = null;
        },
        addPost: {
            reducer: (state, action: PayloadAction<Post>) => {
                const post = action.payload;
                state.postList.push(post);
            },
            prepare: (post: Omit<Post, 'id'>) => ({
                payload: {
                    ...post,
                    id: nanoid(),
                },
            }),
        },
    },
});

export const { addPost, cancelEditingPost, deletePost, finishEditingPost, startEditingPost } = blogSlice.actions;
const blogReducer = blogSlice.reducer;

export default blogReducer;
