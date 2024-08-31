import {  format } from "date-fns";
import { Fragment } from "react";
import {Link} from "react-router-dom";

export default function Blog({ blog }) {

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };


  return (
    <Fragment>
    <div className="col-sm-12 col-md-6 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={`${blog.images[0].image}`}
          alt={blog.title}
        />
        <div className="card-body d-flex flex-column">
            <p>{`Author -${blog.author}`}</p>
            <p>{`Date -${format(new Date(blog.createdAt), "yyyy-MM-dd")}`}</p>
            
          <h5 className="card-title">
            <Link to={`/blog/${blog._id}`} >{blog.title}</Link>
          </h5>
          <p>{truncateText(blog.body, 25)}</p>

          <Link to={`/blog/${blog._id}`} id="view_btn" className="btn btn-block btn-primary">
            Read more
          </Link>
        </div>
      </div>
    </div>
    </Fragment>
  )
}
