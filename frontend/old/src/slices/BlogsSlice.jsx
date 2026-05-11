import { createSlice } from "@reduxjs/toolkit";


const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        loading: false
    },
    reducers: {
        blogsRequest(state, action){
            return {
                loading: true
            }
        },
        blogsSuccess(state, action){
            return {
                loading: false,
                blogs: action.payload.blogs,
                
            }
        },
        blogsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },

        adminBlogsRequest(state, action){
            return {
                loading: true
            }
        },
        adminBlogsSuccess(state, action){
            return {
                loading: false,
                blogs: action.payload.blogs,
                
            }
        },
        adminBlogsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        adminClearError(state,action){
            return {
                ...state,
                error:null
            }
        },

       
    }
});

const { actions, reducer } = blogsSlice;

export const { 
    blogsRequest, 
    blogsSuccess, 
    blogsFail,

    adminBlogsRequest,
    adminBlogsSuccess,
    adminBlogsFail,
    adminClearError

} = actions;

export default reducer;