import axios from 'axios';
import { adminBlogsFail, adminBlogsRequest, adminBlogsSuccess, blogsFail, blogsRequest, blogsSuccess} from '../slices/BlogsSlice';
import { myBlogsFail, myBlogsRequest, myBlogsSuccess } from '../slices/MyBlogsSlice';


export const getBlogs = (keyword) => async (dispatch) => {

    let link ='/api/sh/blog'
    if(keyword){
        link += `?&keyword=${keyword}`
    }

    try {  
        dispatch(blogsRequest()) 
        const { data }  =  await axios.get(link);
        dispatch(blogsSuccess(data))
    } catch (error) {
        
        dispatch(blogsFail(error.response.data.message))
    }
    
}


export const getMyBlogs = (id) => async (dispatch) => {


    try {  
        dispatch(myBlogsRequest()) 
        const { data }  =  await axios.get(`/api/sh/myblogs`);
        dispatch(myBlogsSuccess(data))
    } catch (error) {
        
        dispatch(myBlogsFail(error.response.data.message))
    }
    
}


export const adminGetBlogs = (keyword,id) => async (dispatch) => {

    let link ='/api/sh/admin/blogs'
    if(keyword){
        link += `?&keyword=${keyword}`
    }

    try {  
        dispatch(adminBlogsRequest()) 
        const { data }  =  await axios.get(link);
        dispatch(adminBlogsSuccess(data))
    } catch (error) {
        
        dispatch(adminBlogsFail(error.response.data.message))
    }
    
}