import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getblog } from '../../actions/BlogActions';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';

const PLACEHOLDER = '/images/blog_image/1.jpg';

export default function BlogDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((state) => state.blogState);
  const { id } = useParams();
  useEffect(() => { dispatch(getblog(id)); }, [dispatch, id]);
  if (loading || !blog?._id) return <Loader />;
  const image = blog.images?.[0]?.image || PLACEHOLDER;

  return (
    <Fragment>
      <MetaData title={blog.title} />
      <article className="max-w-[780px] mx-auto my-8 sm:my-12 px-4 sm:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 border-none bg-transparent cursor-pointer p-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">{blog.category}</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4 text-gray-900">{blog.title}</h1>
        <div className="flex flex-wrap gap-3 sm:gap-5 items-center text-sm text-gray-400 mb-8 pb-5 border-b border-gray-200">
          <span>By <strong className="text-gray-700">{blog.author}</strong></span>
          <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
        </div>
        <img
          className="w-full rounded-2xl mb-8 aspect-[16/7] object-cover"
          src={image}
          alt={blog.title}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <div className="text-[1.05rem] sm:text-[1.08rem] leading-relaxed text-gray-600">
          {blog.body.split('\n').map((para, i) =>
            para ? <p key={i} className="mb-5">{para}</p> : null
          )}
        </div>
      </article>
    </Fragment>
  );
}
