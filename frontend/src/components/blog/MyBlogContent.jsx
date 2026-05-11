import { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMyBlog } from '../../actions/BlogActions';
import { truncate } from './Blog';
import ConfirmDialog from '../layouts/ConfirmDialog';

const PLACEHOLDER = '/images/blog_image/1.jpg';

export default function MyBlogContent({ blog }) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = () => setDialogOpen(true);

  const handleConfirm = () => {
    setDialogOpen(false);
    dispatch(deleteMyBlog(blog._id));
  };

  const image = blog.images?.[0]?.image || PLACEHOLDER;

  return (
    <>
      <ConfirmDialog
        open={dialogOpen}
        title="Delete Blog?"
        message={`"${blog.title}" will be permanently deleted and cannot be recovered.`}
        confirmText="Delete"
        onConfirm={handleConfirm}
        onCancel={() => setDialogOpen(false)}
      />

      <div className="blog-img-wrap bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-video overflow-hidden shrink-0">
          <img
            className="blog-img w-full h-full object-cover transition-transform duration-400"
            src={image}
            alt={blog.title}
            onError={(e) => { e.target.src = PLACEHOLDER; }}
          />
        </div>
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[0.72rem] font-bold tracking-wide uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{blog.category}</span>
            <span className="text-xs text-gray-400">{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
          </div>
          <h3 className="text-[1.08rem] font-semibold">
            <Link to={`/blog/${blog._id}`} className="text-gray-900 hover:text-blue-600 transition-colors">{blog.title}</Link>
          </h3>
          <p className="text-sm text-gray-500 flex-1">{truncate(blog.body)}</p>
          <div className="flex gap-2 pt-3 border-t border-gray-200 mt-auto">
            <Link to={`/blog/${blog._id}`} className="flex-1 text-center py-2 px-3 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Read</Link>
            <Link to={`/blog/update/${blog._id}`} className="flex-1 text-center py-2 px-3 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">Edit</Link>
            <button
              onClick={handleDeleteClick}
              className="flex-1 py-2 px-3 rounded-md text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors border-none cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
