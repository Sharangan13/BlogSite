import axios from 'axios';
import { blogFail, blogRequest, blogSuccess, createBlogFail, createBlogRequest, createBlogSuccess, deleteBlogFail, deleteBlogRequest, deleteBlogSuccess, updateBlogFail, updateBlogRequest, updateBlogSuccess } from '../slices/BlogSlice';
import { deleteMyBlogFail, deleteMyBlogRequest, deleteMyBlogSuccess } from '../slices/MyBlogsSlice';


export const getblog = (id) => async (dispatch) => {

    try {  
        dispatch(blogRequest()) 
        const { data }  =  await axios.get(`/api/sh/blog/${id}`);
        dispatch(blogSuccess(data))
    } catch (error) {
        
        dispatch(blogFail(error.response.data.message))
    }
    
}



export const createNewBlog = blogData => async (dispatch) => {

    try {  
        dispatch(createBlogRequest()) 
        const { data }  =  await axios.post(`/api/sh/blog/new`,blogData);
        dispatch(createBlogSuccess(data))
    } catch (error) {
        
        dispatch(createBlogFail(error.response.data.message))
    }
    
}


export const deleteBlog = id => async (dispatch) => {

    try {  
        dispatch(deleteBlogRequest()) 
        await axios.delete(`/api/sh/admin/blog/${id}`);
        dispatch(deleteBlogSuccess())
    } catch (error) {
        dispatch(deleteBlogFail(error.response.data.message))
    }
    
}


export const deleteMyBlog = id => async (dispatch) => {

    try {  
        dispatch(deleteMyBlogRequest()) 
        await axios.delete(`/api/sh/myblog/${id}`);
        dispatch(deleteMyBlogSuccess())
    } catch (error) {
        dispatch(deleteMyBlogFail(error.response.data.message))
    }
    
}


export const authorUpdateBlog = (id,blogData) => async (dispatch) => {

    try {  
        dispatch(updateBlogRequest()) 
        const { data }  =  await axios.put(`/api/sh/blog/update/${id}`,blogData);
        dispatch(updateBlogSuccess(data))
    } catch (error) {
        
        dispatch(updateBlogFail(error.response.data.message))
    }
    
}