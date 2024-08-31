import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getblog } from "../../actions/BlogActions";
import Loader from "../layouts/Loder";
import {  format } from "date-fns";
import MetaData from "../layouts/MetaData";

export default function BlogDetails(){

    const dispatch = useDispatch();
    
    const {blog,loading} = useSelector((state)=>state.blogState)
    const {id} =useParams();

    useEffect(()=>{
        dispatch(getblog(id))

    },[dispatch,id])
    

    return (
      <Fragment>
        {loading?<Loader/>:<Fragment>          
            
           
           <div className="col-sm-12  my-3">
            <MetaData title={blog.title}/>
                  <div className="card p-3 rounded">
                    <img
                      className="blog-detail-img  mx-auto"
                      src={`${blog.images[0].image}`}
                      alt="blog"
                    />
                    <div className="card-body d-flex flex-column">
                        <p>{`Author -${blog.author}`}</p>
                        <p>{`Date -${format(new Date(blog.createdAt), "yyyy-MM-dd")}`}</p>
                        
                      <h5 className="card-title">
                        <h2 href="#">{blog.title}</h2>
                      </h5>
                      <p>{blog.body}</p>
            
                    
             
                    </div>
                  </div>
                </div> 
                </Fragment>}
      </Fragment>
        
      )
}