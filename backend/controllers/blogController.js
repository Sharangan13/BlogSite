
const catchAsyncError = require("../middlewares/catchAsyncError");
const blogModel = require("../models/blogModel");
const APIFeatures = require("../util/apiFeatures");
const ErrorHandler = require("../util/errorHandler");

// -------------------------------------Gust,User,Admin Functions--------------------------------------------------//


// 01. Get all blogs      URL = http://localhost:8000/api/sh/blog     -------------------------------------------------------------------

exports.getBlogs = async (req, res, next) => {

  const apiFeatures= new APIFeatures(blogModel.find(), req.query).search().filter(); 
  
  const blogs = await apiFeatures.query;
  // await new Promise(resolve=>setTimeout(resolve,3000))    check loader working correct
  // return next(new ErrorHandler("Testing msg............",400))  check toast loader to show error message 
  res.status(200).json({
    sucess: true,
    count: blogs.length,
    blogs,
  });
};





// 03. Get single Blog        URL = http://localhost:8000/api/sh/blog/:id     -------------------------------------------------------------------

exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
     return next( new ErrorHandler("Blog no found",400))
    }

    res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {
    
    next(error);    // Pass the caught error to the error handling middleware.   //
  }
  
};



//------------------------User,Admin Functions------------------------------//


// 02. Create New Blog       URL = http://localhost:8000/api/sh/blog/new      -------------------------------------------------------------------

exports.createNewBlog = catchAsyncError(async(req, res, next) => {


  let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files && req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/upload/blog/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

  req.body.authorId = req.user.id;
  const blog = await blogModel.create(req.body);
  res.status(201).json({
    sucess: true,
    blog
  });
});




// 04. Update Blog         URL = http://localhost:8000/api/sh/blog/:id     -------------------------------------------------------------------

exports.updateBlog = async (req, res, next) => {
  let blog = await blogModel.findById(req.params.id);

  //image upload
  let images = []

  // if images not cleared we keep existing images
  if(req.body.imagesCleared === 'false'){
    images =blog.images;
  }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files && req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/upload/blog/${file.originalname}`;
            images.push({ image: url })
        })
    }
    req.body.images = images;



    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      sucess: true,
      blog
    });
  
};





// 05. Delete Blog          URL = http://localhost:8000/api/sh/blog/:id     -------------------------------------------------------------------

exports.deleteBlog = async (req,res,next)=>{
    
        let blog = await blogModel.findById(req.params.id);
      
          if (!blog) {
            return res.status(404).json({
              success: false,
              message: "Blog not found",
            });
          }

        await blogModel.findByIdAndDelete(req.params.id)
      
          res.status(200).json({
            sucess: true,
            message:"Delete Sucessfully"
          });
}





// ------------------------User Function----------------------------//



// 06.  Get Logged in User Blogs             URL =  http://localhost:8000/api/sh/myblogs    -------------------------------------------------------------------


exports.myBlogs = catchAsyncError(async (req,res,next)=>{

  const myBlogs = await blogModel.find({authorId:req.user.id})

  res.status(200).json({
    sucess: true,
    myBlogs
  });
})



// 07. Get Admin Blogs

exports.getAdminBlogs = async (req, res, next) => {

  const apiFeatures= new APIFeatures(blogModel.find(), req.query).search().filter(); 
  
  const blogs = await apiFeatures.query;
  // await new Promise(resolve=>setTimeout(resolve,3000))    check loader working correct
  // return next(new ErrorHandler("Testing msg............",400))  check toast loader to show error message 
  res.status(200).json({
    sucess: true,
    count: blogs.length,
    blogs,
  });
};

