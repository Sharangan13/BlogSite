import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: 'blogDetail',
    initialState: {
        loading: true,
        btnDisable:false,
        isBlogDeleted:false,
        isBlogUpdated:false,
        blog:{}
    },
    reducers: {
        blogRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        blogSuccess(state, action){
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                
            }
        },
        blogFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

        createBlogRequest(state, action){
            return {
                ...state,
                loading:true,
                btnDisable:true
            }
        },
        createBlogSuccess(state, action){
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                btnDisable:false,
                isBlogCreated:true
                
            }
        },
        createBlogFail(state, action){
            return {
                ...state,
                loading: false,
                btnDisable:false,
                error:  action.payload
                
            }
        },
        clearCreatedBlog(state, action){
            return {
                ...state,
                loading: false,
                isBlogCreated:false
            }
        },
        clearError(state, action){
            return {
                ...state,
                error: null
            }
        },

        deleteBlogRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteBlogSuccess(state, action){
            return {
                ...state,
                loading: false,
                isBlogDeleted:true
                
            }
        },
        deleteBlogFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearBlogDeleted(state, action){
            return {
                ...state,
                isBlogDeleted:false
            }
        },


        updateBlogRequest(state, action){
            return {
                ...state,
                loading:true,
                
            }
        },
        updateBlogSuccess(state, action){
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                isBlogUpdated:true
                
            }
        },
        updateBlogFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
                
            }
        },
        clearBlogUpdated(state, action){
            return {
                ...state,
                isBlogUpdated:false
            }
        },
       
    }
});

const { actions, reducer } = blogSlice;

export const { 
    blogRequest, 
    blogSuccess, 
    blogFail,

    createBlogRequest,
    createBlogSuccess,
    createBlogFail,
    
    clearError,
    clearCreatedBlog,

    deleteBlogRequest,
    deleteBlogSuccess,
    deleteBlogFail,
    clearBlogDeleted,

    updateBlogRequest,
    updateBlogSuccess,
    updateBlogFail,
    clearBlogUpdated

} = actions;

export default reducer;