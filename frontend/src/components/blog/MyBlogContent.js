import { format } from "date-fns";
import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyBlog } from "../../actions/BlogActions";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from Bootstrap
import { IoClose } from "react-icons/io5";


export default function MyBlogContent({ blog }) {
  const [show, setShow] = useState(false); // Modal visibility state
  const [blogIdToDelete, setBlogIdToDelete] = useState(null); // Track which blog to delete

  const truncateText = useCallback((text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }, []);

  const dispatch = useDispatch();

  const handleDeleteClick = (_id) => {
    setBlogIdToDelete(_id);
    setShow(true); // Show the modal when delete button is clicked
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMyBlog(blogIdToDelete)); // Dispatch delete action
    setShow(false); // Close the modal
  };

  const handleClose = () => setShow(false); // Close modal without deleting

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
              <Link to={`/blog/${blog._id}`} href="#">
                {blog.title}
              </Link>
            </h5>
            <p>{truncateText(blog.body, 25)}</p>
            <div className="d-flex justify-content-between align-items-center">
              <Link
                to={`/blog/${blog._id}`}
                className="btn btn-flex btn-info col-3"
              >
                Read more
              </Link>
              <Link
                to={`/blog/update/${blog._id}`}
                className="btn btn-flex btn-warning col-3"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteClick(blog._id)} // Trigger modal on delete click
                className="btn btn-flex btn-danger col-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose}>
      
        <Modal.Header>
          
          <Modal.Title>Confirm Delete</Modal.Title>
          <IoClose onClick={handleClose}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}/>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
