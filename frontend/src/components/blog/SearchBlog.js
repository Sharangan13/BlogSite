import { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../actions/BlogsActions';
import Loader from '.././layouts/Loder';
import Blog from '.././blog/Blog';
import {toast} from 'react-toastify';
import MetaData from '../layouts/MetaData';
import { useParams } from 'react-router-dom';

export default function SearchBlog() {

    const dispatch = useDispatch();
    const {keyword}=useParams();

    const {blogs,loading,error} = useSelector((state)=>state.blogsState)

    useEffect(()=>{
        if(error){

          return  toast.error(error,{
            position : "bottom-center"
          })

        }
        dispatch(getBlogs(keyword))
        
    },[dispatch,keyword,error])


   


    return (

        <Fragment>
            {loading ? <Loader/>:
            <Fragment>
            <MetaData title={'Blogs'} />

            <div className="container mt-5">
                <h1 id="products_heading">Result</h1>

                <div className="row">
                {blogs && blogs.length > 0 ? (
                                blogs.map(blog => (
                                    <Blog key={blog._id} blog={blog} />
                                ))
                            ) : (
                                <h5 className='text-center col-12 '>No blogs found</h5>
                            )}
                    

                    
                </div>
            </div>
        </Fragment>}
        

        </Fragment>
    );
}
