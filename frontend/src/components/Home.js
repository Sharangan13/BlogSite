import { Fragment, useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../actions/BlogsActions';
import Loader from './layouts/Loder';
import Blog from './blog/Blog';
import {toast} from 'react-toastify';

export default function Home() {

    const dispatch = useDispatch();

    const {blogs,loading,error} = useSelector((state)=>state.blogsState)

    useEffect(()=>{
        if(error){
          return  toast.error(error,{
            position : "bottom-center"
          })
        }
        dispatch(getBlogs())
        
    },[dispatch,error])

    return (

        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title={'Blogs'} />

            <div className="container mt-5">
                <h1 id="products_heading">Latest Blogs</h1>
                <div className="row">
                    {blogs && blogs.map(blog=>(
                   <Blog key={blog._id} blog={blog}/>)
                )}  
                </div>
            </div>
        </Fragment>}
        

        </Fragment>
    );
}
