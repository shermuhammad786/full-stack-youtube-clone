
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allComments: null,
    loading: false,
    error: false,
}

export const allCommentsSlice = createSlice({
    name: "allComments",
    initialState,
    reducers: {
        allCommentsSuccess: (state, action) => {
            state.loading = false,
                state.allComments = action.payload;
        },
    }
});
export const { allCommentsSuccess } = allCommentsSlice.actions

export default allCommentsSlice.reducer