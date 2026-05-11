import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authorUpdateBlog, getblog } from '../../actions/BlogActions';
import { clearBlogUpdated, clearError } from '../../slices/BlogSlice';
import MetaData from '../layouts/MetaData';

const CATEGORIES = ['Travel Blogs','Food Blogs','Fashion Blogs','Lifestyle Blogs','Fitness Blogs','Parenting Blogs','Tech Blogs','Finance Blogs','DIY/Craft Blogs','Book Blogs'];

export default function UpdateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: blogId } = useParams();
  const { loading, isBlogUpdated, error, blog } = useSelector((s) => s.blogState);
  const [fields, setFields] = useState({ title: '', body: '', author: '', category: '' });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const onChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });
  const onImagesChange = (e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => { if (reader.readyState === 2) { setPreviews((p) => [...p, reader.result]); setImages((p) => [...p, file]); } };
      reader.readAsDataURL(file);
    });
  };
  const clearImages = () => { setImages([]); setPreviews([]); setImagesCleared(true); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
    images.forEach((img) => formData.append('images', img));
    formData.append('imagesCleared', imagesCleared);
    dispatch(authorUpdateBlog(blogId, formData));
  };

  useEffect(() => { dispatch(getblog(blogId)); }, [dispatch, blogId]);
  useEffect(() => { if (blog?._id) { setFields({ title: blog.title, body: blog.body, author: blog.author, category: blog.category }); setPreviews(blog.images.map((i) => i.image)); } }, [blog]);
  useEffect(() => {
    if (isBlogUpdated) { toast.success('Blog updated!', { position: 'bottom-center', onOpen: () => dispatch(clearBlogUpdated()) }); navigate(`/blog/${blogId}`); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearError()) }); }
  }, [isBlogUpdated, error, dispatch, navigate, blogId]);

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <Fragment>
      <MetaData title="Edit Story" />
      <div className="min-h-[calc(100vh-64px)] flex items-start justify-center pt-8 sm:pt-12 px-4 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 w-full max-w-2xl shadow-md flex flex-col gap-5">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors border-none bg-transparent cursor-pointer p-0 self-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Edit Story</h2>
            <p className="text-sm text-gray-400 mt-1">Update your blog post below.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Title</label>
              <input name="title" type="text" required value={fields.title} onChange={onChange} className={inputCls} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Category</label>
              <select name="category" required value={fields.category} onChange={onChange} className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Author</label>
              <input name="author" type="text" required value={fields.author} onChange={onChange} className={inputCls} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Body</label>
              <textarea name="body" rows="10" required value={fields.body} onChange={onChange} className={`${inputCls} resize-y min-h-[140px]`} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Images</label>
              <label htmlFor="update-images" className="inline-block text-center px-5 py-2 bg-gray-100 border-2 border-dashed border-gray-400 rounded-md text-sm font-medium text-gray-600 cursor-pointer hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                Click to replace images
              </label>
              <input id="update-images" type="file" accept=".jpg,.jpeg,.png" multiple onChange={onImagesChange} className="hidden" />
              {previews.length > 0 && (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <div className="flex flex-wrap gap-2">
                    {previews.map((src, i) => <img key={i} src={src} alt={`Preview ${i + 1}`} className="w-20 h-15 object-cover rounded-md border border-gray-200" />)}
                  </div>
                  <button type="button" onClick={clearImages} className="text-xs text-red-500 bg-transparent border-none cursor-pointer">Clear all</button>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
