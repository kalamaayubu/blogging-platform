// This slice is to help provide the blog data for editing
// When the editing finishes, the blog is removed from the store
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    blog: {}
}

const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {
        setBlog: (state, action) => {
            state.blog = action.payload
            localStorage.setItem('blog', JSON.stringify(state.blog)) // Save to the local storage
        }, 
        removeBlog: (state) => {
            state.blog = {}    // Remove from store after successful update
            localStorage.removeItem('blog') // Remove from local storage
        }
    }
})

export const { setBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer