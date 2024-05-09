
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    comment: null,
    loading: false,
    error: false,
}

export const commentSlice = createSlice({
    name: "newComments",
    initialState,
    reducers: {
        commentStart: (state) => {
            state.loading = true
        },
        commentSuccess: (state, action) => {
            state.loading = false,
                state.comment = action.payload;
        },
        allCommentSuccess: (state, action) => {
            state.loading = false,
                state.comment = action.payload;
        },

        ommentFailure: (state) => {
            state.loading = false,
                state.error = true
        },
    }
});
export const { commentStart, commentSuccess, commentFailure, allCommentSuccess } = commentSlice.actions

export default commentSlice.reducer