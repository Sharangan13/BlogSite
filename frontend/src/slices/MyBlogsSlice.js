import { createSlice } from "@reduxjs/toolkit";


const myBlogsSlice = createSlice({
    name: 'myBlogs',
    initialState: {
        loading: false,
        isBlogDeleted:false,
        myBlogs:[]
    },
    reducers: {
        
        myBlogsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        myBlogsSuccess(state, action){
            return {
                ...state,
                loading: false,
                myBlogs: action.payload.myBlogs,
                
            }
        },
        myBlogsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

        deleteMyBlogRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteMyBlogSuccess(state, action){
            return {
                ...state,
                loading: false,
                isBlogDeleted:true
                
                
            }
        },
        deleteMyBlogFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

        clearMyBlogDeleted(state, action){
            return {
                ...state,
                isBlogDeleted:false,
                error:null

            }
        },


       
    }
});

const { actions, reducer } = myBlogsSlice;

export const { 
    myBlogsRequest,
    myBlogsSuccess,
    myBlogsFail,

    deleteMyBlogRequest,
    deleteMyBlogSuccess,
    deleteMyBlogFail,
    clearMyBlogDeleted

} = actions;

export default reducer;