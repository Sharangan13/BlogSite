import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyBlogs } from '../../actions/BlogsActions';
import { clearMyBlogDeleted } from '../../slices/MyBlogsSlice';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import MyBlogContent from './MyBlogContent';

export default function MyBlogs() {
  const dispatch = useDispatch();
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
        <main className="max-w-6xl mx-auto px-8 py-10">
          <div className="flex items-baseline gap-3 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Stories</h1>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">{myBlogs.length} posts</span>
          </div>
          {myBlogs.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
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
