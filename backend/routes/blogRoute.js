const express = require('express');
const { getBlogs, createNewBlog, getSingleBlog, updateBlog, deleteBlog, myBlogs, getAdminBlogs } = require('../controllers/blogController');
const router = express.Router();
const {isAuthendicatedUser,authorizeRole}= require("../middlewares/authendicate")
const multer = require("multer")
const path = require("path")


const storage = multer.memoryStorage(); // Use memory storage for blob upload
const upload = multer({ storage });

router.route('/blog').get(getBlogs);


router.route('/blog/:id').get(getSingleBlog);



router.route('/myblogs').get(isAuthendicatedUser,myBlogs)
router.route('/myblog/:id').delete(isAuthendicatedUser,authorizeRole('admin','user'),deleteBlog);
router.route('/blog/update/:id').put(isAuthendicatedUser,authorizeRole('user','admin'),upload.array('images'),updateBlog);

router.route('/blog/new').post(
    isAuthendicatedUser,
    upload.array('images'), // Use multer for handling file uploads
    createNewBlog
);
router.route('/admin/blogs').get(isAuthendicatedUser,authorizeRole('admin'),getAdminBlogs);
router.route('/admin/blog/:id').delete(isAuthendicatedUser,authorizeRole('admin'),deleteBlog);
// router.route('/admin/blog/:id').put(isAuthendicatedUser,authorizeRole('admin'),upload.array('images'),updateBlog);




module.exports = router;

