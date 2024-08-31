import { format } from "date-fns";
import { Fragment, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyBlog } from "../../actions/BlogActions";

export default function MyBlogContent({blog}) {
  
  const truncateText = useCallback((text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }, []);

  const dispatch = useDispatch();

  const deleteHandler = (e, _id) => {
    e.target.disabled = true;
    dispatch(deleteMyBlog(_id))
}



  return (
    <Fragment>
          <div className="col-sm-12 col-md-6 my-3" key={blog._id}>
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src={blog.images[0].image}
                alt={blog.title}
              />
              <div className="card-body d-flex flex-column">
                <p>{`Author - ${blog.author}`}</p>
                <p>{`Date - ${format(new Date(blog.createdAt), "yyyy-MM-dd")}`}</p>
                <h5 className="card-title">
                  <Link to={`/blog/${blog._id}`} href="#">{blog.title}</Link>
                </h5>
                <p>{truncateText(blog.body, 25)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/blog/${blog._id}`} className="btn btn-flex btn-info col-3">
                    Read more
                  </Link>
                  <Link to={`/blog/update/${blog._id}`} className="btn btn-flex btn-warning col-3">
                    Edit
                  </Link>
                  <button onClick={e => deleteHandler(e,blog._id)} className="btn btn-flex btn-danger col-3">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
       
    </Fragment>
  );
}
