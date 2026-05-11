const express = require('express');
const { getBlogs, createNewBlog, getSingleBlog, updateBlog, deleteBlog, myBlogs, getAdminBlogs } = require('../controllers/blogController');
const router = express.Router();
const {isAuthendicatedUser,authorizeRole}= require("../middlewares/authendicate")
const multer = require("multer")
const path = require("path")


const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..','upload/blog'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

router.route('/blog').get(getBlogs);


router.route('/blog/:id').get(getSingleBlog);



router.route('/myblogs').get(isAuthendicatedUser,myBlogs)
router.route('/myblog/:id').delete(isAuthendicatedUser,authorizeRole('admin','user'),deleteBlog);
router.route('/blog/update/:id').put(isAuthendicatedUser,authorizeRole('user','admin'),upload.array('images'),updateBlog);

router.route('/blog/new').post(isAuthendicatedUser,upload.array('images'),createNewBlog);
router.route('/admin/blogs').get(isAuthendicatedUser,authorizeRole('admin'),getAdminBlogs);
router.route('/admin/blog/:id').delete(isAuthendicatedUser,authorizeRole('admin'),deleteBlog);
// router.route('/admin/blog/:id').put(isAuthendicatedUser,authorizeRole('admin'),upload.array('images'),updateBlog);




module.exports = router;

