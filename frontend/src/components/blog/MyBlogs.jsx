import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyBlogs } from '../../actions/BlogsActions';
import { clearMyBlogDeleted } from '../../slices/MyBlogsSlice';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import MyBlogContent from './MyBlogContent';

export default function MyBlogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myBlogs = [], loading, error, isBlogDeleted } = useSelector((s) => s.myblogsState);

  useEffect(() => {
    if (error) { toast.error(error, { position: 'bottom-center', onClose: () => dispatch(clearMyBlogDeleted()) }); return; }
    if (isBlogDeleted) { toast.success('Blog deleted', { position: 'bottom-center', onClose: () => dispatch(clearMyBlogDeleted()) }); }
    dispatch(getMyBlogs());
  }, [dispatch, error, isBlogDeleted]);

  return (
    <Fragment>
      <MetaData title="My Blogs" />
      {loading ? <Loader /> : (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4 border-none bg-transparent cursor-pointer p-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-baseline gap-3 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Stories</h1>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">{myBlogs.length} posts</span>
          </div>

          {myBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBlogs.map((blog) => <MyBlogContent key={blog._id} blog={blog} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-600">No stories yet</h3>
              <p className="text-sm">You haven't written anything. Start your first blog today!</p>
            </div>
          )}
        </main>
      )}
    </Fragment>
  );
}
