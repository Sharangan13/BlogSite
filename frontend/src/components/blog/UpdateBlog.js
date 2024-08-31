import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authorUpdateBlog, getblog } from "../../actions/BlogActions";
import { clearBlogUpdated, clearError } from "../../slices/BlogSlice";

export default function UpdateBlog() {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isBlogUpdated, error, blog } = useSelector(state => state.blogState);
    const { id: blogId } = useParams();

    const categories = [
        "Travel Blogs", 
        "Food Blogs", 
        "Fashion Blogs", 
        "Lifestyle Blogs", 
        "Fitness Blogs",
        "Parenting Blogs", 
        "Tech Blogs", 
        "Finance Blogs", 
        "DIY/Craft Blogs", 
        "Book Blogs"
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const onImagesChange = (e) => {

        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('author', author);
        formData.append('category', category);

        if (images.length > 0) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        formData.append('imagesCleared', imagesCleared);
        dispatch(authorUpdateBlog(blogId, formData));
    };

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    };

    useEffect(() => {
        if (isBlogUpdated) {
            toast('Blog Updated Successfully!', {
                type: 'success',
                position: "bottom-center",
                onOpen: () => dispatch(clearBlogUpdated())
            });
            setImages([]); 
            navigate(`/blog/${blogId}`);
            return;
        }

        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        dispatch(getblog(blogId));
    }, [isBlogUpdated, error, blogId, dispatch, navigate]);


    useEffect(() => {
        if (blog && blog._id) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
            setCategory(blog.category);
            let images = [];
            blog.images.forEach(image => {
                images.push(image.image);
            });
            setImagesPreview(images);
        }
    }, [blog]);

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <Fragment>
                    <div className="wrapper my-5 col-10">
                        <form onSubmit={submitHandler} className="shadow-lg col-12" encType='multipart/form-data'>
                            <h1 className="mb-4">Update Blog</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Title</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    required
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Body</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="12"
                                    required
                                    onChange={e => setBody(e.target.value)}
                                    value={body}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="form-control"
                                    id="category_field"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Author Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    required
                                    onChange={e => setAuthor(e.target.value)}
                                    value={author}
                                />
                            </div>

                            <div className="form-group">
                                <label>Images</label>
                                <div className="custom-file">
                                    <input
                                        type='file'
                                        name='blog_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        accept='.jpg, .jpeg, .png'
                                        required={imagesPreview.length <= 0}
                                        onChange={onImagesChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 && 
                                    <span className="mr-2" style={{ cursor: "pointer" }} onClick={clearImagesHandler}>
                                        <i className="fa fa-trash"></i>
                                    </span>
                                }
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 mr-2"
                                        key={image}
                                        src={image}
                                        alt="Image Preview"
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                            >
                                Update Blog
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
