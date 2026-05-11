import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getBlogs } from '../actions/BlogsActions';
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loder';
import Blog from './blog/Blog';

const CATEGORIES = [
  'All', 'Travel Blogs', 'Food Blogs', 'Fashion Blogs',
  'Lifestyle Blogs', 'Fitness Blogs', 'Tech Blogs', 'Finance Blogs',
];

export default function Home() {
  const dispatch = useDispatch();
  const { blogs = [], loading, error } = useSelector((state) => state.blogsState);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { dispatch(getBlogs()); }, [dispatch]);
  useEffect(() => { if (error) toast.error(error, { position: 'bottom-center' }); }, [error]);

  const filtered = activeCategory === 'All' ? blogs : blogs.filter((b) => b.category === activeCategory);

  return (
    <Fragment>
      <MetaData title="The Blog — Latest Stories" />

      {/* Hero */}
      <section className="text-center py-16 px-8 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 border-b border-gray-200">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">Stories Worth Reading</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ideas. Opinions. Life.</h1>
        <p className="text-base text-gray-600 max-w-md mx-auto">Explore fresh perspectives from writers around the world.</p>
      </section>

      {/* Category Pills */}
      <div className="flex gap-2 px-8 py-4 bg-white border-b border-gray-200 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => (
          <span
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer whitespace-nowrap transition-all
              ${activeCategory === c
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-600 hover:text-blue-600'}`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Blog Grid */}
      {loading ? <Loader /> : (
        <main className="max-w-6xl mx-auto px-8 py-10">
          <div className="flex items-baseline gap-3 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Latest Blogs</h1>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">{filtered.length} stories</span>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {filtered.map((blog) => <Blog key={blog._id} blog={blog} />)}
            </div>
          ) : (
            <div className="text-center py-16 px-8 text-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-600">No stories yet</h3>
              <p className="text-sm">Be the first to write something great.</p>
            </div>
          )}
        </main>
      )}
    </Fragment>
  );
}
