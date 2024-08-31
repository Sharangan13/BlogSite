import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect } from "react";
import { adminGetBlogs } from "../../actions/BlogsActions";
import { adminGetUsersDetails } from "../../actions/AdminAction";
import Loader from "../layouts/Loder";



export default function Dashboard () {

    const {blogs=[]} = useSelector((state)=>state.blogsState)
    
    const {users=[],loading} = useSelector((state)=>state.usersState)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(adminGetBlogs())
        dispatch(adminGetUsersDetails())

    },[dispatch,])

    let admin=0;
    if(users.length>0){
    users.forEach(user => {
        if(user.role=="admin"){
            admin=admin+1;
        }
        
    });
}

let blogers=users.length-admin;

   


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <Fragment>{loading?<Loader/>:<div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                
                <div className="row pr-4">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Blogs<br /> <b>{blogs.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/blogs">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>



                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Blogers<br /> <b>{blogers}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-secondary o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Admins<br /> <b>{admin}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/admins">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    
                </div>
            </div>} </Fragment>
            
        </div>
    )
}