import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNewBlog } from '../../actions/BlogActions';
import { clearCreatedBlog, clearError } from '../../slices/BlogSlice';
import MetaData from '../layouts/MetaData';

const CATEGORIES = ['Travel Blogs','Food Blogs','Fashion Blogs','Lifestyle Blogs','Fitness Blogs','Parenting Blogs','Tech Blogs','Finance Blogs','DIY/Craft Blogs','Book Blogs'];

export default function CreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isBlogCreated, error, btnDisable } = useSelector((state) => state.blogState);
  const [fields, setFields] = useState({ title: '', body: '', author: '', category: '' });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const onChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });
  const onImagesChange = (e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => { if (reader.readyState === 2) { setPreviews((p) => [...p, reader.result]); setImages((p) => [...p, file]); } };
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
    images.forEach((img) => formData.append('images', img));
    dispatch(createNewBlog(formData));
  };
  useEffect(() => {
    if (isBlogCreated) { toast.success('Blog created!', { position: 'bottom-center', onOpen: () => dispatch(clearCreatedBlog()) }); navigate('/'); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearError()) }); }
  }, [isBlogCreated, error, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title="Write a New Blog" />
      <div className="min-h-[calc(100vh-64px)] flex items-start justify-center pt-12 px-4 bg-gray-50">
        <form className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-2xl shadow-md flex flex-col gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>New Story</h2>
          <p className="text-sm text-gray-400 -mt-3">Share your thoughts with the world.</p>

          {[{label:'Title',name:'title',type:'text',placeholder:'Give your story a title'},{label:'Author Name',name:'author',type:'text',placeholder:'Your name'}].map(({label,name,type,placeholder}) => (
            <div key={name} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">{label}</label>
              <input name={name} type={type} required value={fields[name]} onChange={onChange} placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Category</label>
            <select name="category" required value={fields.category} onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Body</label>
            <textarea name="body" rows="10" required value={fields.body} onChange={onChange} placeholder="Tell your story…"
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-y min-h-[140px]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Cover Images</label>
            <label htmlFor="blog-images" className="inline-block text-center px-5 py-2 bg-gray-100 border-2 border-dashed border-gray-400 rounded-md text-sm font-medium text-gray-600 cursor-pointer hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
              Click to upload images (JPG, PNG)
            </label>
            <input id="blog-images" type="file" name="images" accept=".jpg,.jpeg,.png" multiple required onChange={onImagesChange} className="hidden" />
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {previews.map((src, i) => <img key={i} src={src} alt={`Preview ${i+1}`} className="w-20 h-15 object-cover rounded-md border border-gray-200" />)}
              </div>
            )}
          </div>

          <button type="submit" disabled={btnDisable || loading}
            className="w-full py-3 px-6 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Publishing…' : 'Publish Story'}
          </button>
        </form>
      </div>
    </Fragment>
  );
}
