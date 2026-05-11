import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminGetBlogs } from '../../actions/BlogsActions';
import { deleteBlog } from '../../actions/BlogActions';
import { adminClearError } from '../../slices/BlogsSlice';
import { clearBlogDeleted, clearError as clearBlogError } from '../../slices/BlogSlice';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';
import ConfirmDialog from '../layouts/ConfirmDialog';

const cut = (text, n) => text.length > n ? text.slice(0, n) + '…' : text;

export default function BlogList() {
  const dispatch = useDispatch();
  const { blogs = [], loading, error } = useSelector((s) => s.blogsState);
  const { isBlogDeleted, error: blogError } = useSelector((s) => s.blogState);

  const [dialog, setDialog] = useState({ open: false, blogId: null, title: '' });

  const handleDeleteClick = (blog) => {
    setDialog({ open: true, blogId: blog._id, title: blog.title });
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBlog(dialog.blogId));
    setDialog({ open: false, blogId: null, title: '' });
  };

  useEffect(() => {
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(adminClearError()) }); return; }
    if (blogError) { toast.error(blogError, { position: 'bottom-center', onOpen: () => dispatch(clearBlogError()) }); return; }
    if (isBlogDeleted) { toast.success('Blog deleted!', { position: 'bottom-center', onOpen: () => dispatch(clearBlogDeleted()) }); }
    dispatch(adminGetBlogs());
  }, [dispatch, error, blogError, isBlogDeleted]);

  return (
    <>
      <MetaData title="Admin — Blogs" />
      <ConfirmDialog
        open={dialog.open}
        title="Delete Blog?"
        message={`"${dialog.title}" will be permanently removed.`}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDialog({ open: false, blogId: null, title: '' })}
      />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="flex-1 px-4 sm:px-8 py-6 sm:py-10 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6 sm:mb-8 text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            Blog List ({blogs.length})
          </h1>
          {loading ? <Loader /> : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[500px] border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr>
                    {['Title', 'Author', 'Category', 'Actions'].map(h => (
                      <th key={h} className="px-4 sm:px-5 py-4 text-left text-[0.78rem] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 border-b border-gray-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:[&>td]:bg-gray-50">
                      <td className="px-4 sm:px-5 py-4 text-sm text-gray-600 border-b border-gray-200">{cut(blog.title, 40)}</td>
                      <td className="px-4 sm:px-5 py-4 text-sm text-gray-600 border-b border-gray-200">{cut(blog.author, 20)}</td>
                      <td className="px-4 sm:px-5 py-4 text-sm text-gray-600 border-b border-gray-200">{blog.category}</td>
                      <td className="px-4 sm:px-5 py-4 border-b border-gray-200">
                        <button
                          className="px-4 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none cursor-pointer transition-all"
                          onClick={() => handleDeleteClick(blog)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
