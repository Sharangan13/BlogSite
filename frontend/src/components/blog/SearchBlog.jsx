import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBlogs } from '../../actions/BlogsActions';
import Loader from '../layouts/Loder';
import Blog from './Blog';
import MetaData from '../layouts/MetaData';

export default function SearchBlog() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { blogs = [], loading, error } = useSelector((state) => state.blogsState);
  useEffect(() => {
    if (error) { toast.error(error, { position: 'bottom-center' }); return; }
    dispatch(getBlogs(keyword));
  }, [dispatch, keyword, error]);

  return (
    <Fragment>
      <MetaData title={`Search: ${keyword}`} />
      {loading ? <Loader /> : (
        <main className="max-w-6xl mx-auto px-8 py-10">
          <div className="flex items-baseline gap-3 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Results for "{keyword}"</h1>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">{blogs.length} found</span>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-600">No results found</h3>
              <p className="text-sm">Try a different keyword.</p>
            </div>
          )}
        </main>
      )}
    </Fragment>
  );
}
