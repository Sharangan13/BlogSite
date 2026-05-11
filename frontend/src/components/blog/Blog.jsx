import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const truncate = (text = '', wordLimit = 25) => {
  const words = text.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '…' : text;
};

const PLACEHOLDER = '/images/blog_image/1.jpg';

export default function Blog({ blog }) {
  const date = format(new Date(blog.createdAt), 'MMM d, yyyy');
  const image = blog.images?.[0]?.image || PLACEHOLDER;

  return (
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
          <span className="text-[0.72rem] font-bold tracking-wide uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {blog.category}
          </span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <h3 className="text-[1.08rem] font-semibold leading-snug">
          <Link to={`/blog/${blog._id}`} className="text-gray-900 hover:text-blue-600 transition-colors">{blog.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 flex-1">{truncate(blog.body)}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
          <span className="text-xs text-gray-400 font-medium">By {blog.author}</span>
          <Link to={`/blog/${blog._id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
