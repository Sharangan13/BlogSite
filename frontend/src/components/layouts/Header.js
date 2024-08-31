import React from 'react';
import BlogSearch from './BlogSearch';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Dropdown, Image} from 'react-bootstrap';
import { logOut } from '../../actions/UserActions';
import { IoCreateOutline } from "react-icons/io5";

export default function Header(){

  const {isAuthenticated,user}= useSelector(state => state.authState)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logOutHandler =()=>{
    dispatch(logOut)
    navigate(`/`)
  }


    return(
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={"/"}>
          <img width="150px" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <BlogSearch/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated? (
          <div>
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="50px" src={user.avatar?? "/images/avatar1.png"}  />
                    </figure>
                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/myblogs')}} className='text-dark'>My Blogs</Dropdown.Item>
                      <Dropdown.Item onClick={logOutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>

                  
              </Dropdown>
              <Link to="/blog/new"  className='text-white'>Create a new blog <IoCreateOutline size={20}/></Link>

              
              </div>
              
            ):
            (<div>
              <Link to="/login" className="btn" id="login_btn">Login</Link>
              <Link to="/blog/new"  className='text-white px-4'>Create a new blog <IoCreateOutline size={20}/></Link>
              </div>
            )}
        
      </div>
    </nav>
    )
}