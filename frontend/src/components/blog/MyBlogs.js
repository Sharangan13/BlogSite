import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearMyBlogDeleted } from "../../slices/MyBlogsSlice";

import MetaData from '../layouts/MetaData';
import MyBlogContent from './MyBlogContent';
import { getMyBlogs } from '../../actions/BlogsActions';
import Loader from '../layouts/Loder';

export default function MyBlogs() {
    const dispatch = useDispatch();
    const { myBlogs = [], loading, error,isBlogDeleted } = useSelector((state) => state.myblogsState);
    const { user } = useSelector((state) => state.authState);

    useEffect(() => {
        if (error) {
            toast.error(error, { 
              position: "bottom-center",
              onClose: () => dispatch(clearMyBlogDeleted()) });
              return
        } 

        if (isBlogDeleted) {
            toast.success("Blog deleted successfully", {
              position: "bottom-center",
              onClose: () => dispatch(clearMyBlogDeleted())
            });
          }
          dispatch(getMyBlogs(user._id));

    }, [dispatch, error, isBlogDeleted]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Blogs'} />
                    <div className="container mt-5">
                        <h1 id="products_heading">My Blogs -  {myBlogs.length}</h1>
                        <div className="row">
                            {myBlogs.length > 0 ? (
        myBlogs.map(blog => (
                                    <MyBlogContent  key={blog._id} blog={blog} />
                                ))
                            ) : (
                              <h1>No Blogs Found</h1>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
