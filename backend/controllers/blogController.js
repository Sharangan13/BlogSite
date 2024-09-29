const { put } = require('@vercel/blob'); 
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

exports.createNewBlog = catchAsyncError(async (req, res, next) => {
  const images = [];
  const files = req.files;

  // Check for the upload token
  const uploadToken ="vercel_blob_rw_lUSA2go8ipySDpex_w6tss9owH4MW6R9MMQNpNOMIghabA3";
  if (!uploadToken) {
      console.error("Upload token not found!");
      return next(new ErrorHandler("Upload token is missing", 500));
  }

  try {
      for (const file of files) {
          console.log("Uploading:", file.originalname);
          // console.log("File Buffer:", file.buffer);

          const upload = await put(file.originalname, file.buffer, { access: 'public', token: uploadToken });
          const url = upload.url;
          images.push({ image: url });
      }
  } catch (error) {
      console.error("Upload error:", error);
      return next(new ErrorHandler("Image upload failed", 500));
  }

  req.body.images = images;
  req.body.authorId = req.user.id;

  const blog = await blogModel.create(req.body);
  res.status(201).json({
      success: true,
      blog,
  });
});







// 04. Update Blog         URL = http://localhost:8000/api/sh/blog/:id     -------------------------------------------------------------------

exports.updateBlog = catchAsyncError(async (req, res, next) => {
  let blog = await blogModel.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  // Initialize an array for images
  let images = [];

  // If images are not cleared, keep existing images
  if (req.body.imagesCleared === 'false') {
    images = blog.images;
  }

  // Check for the upload token
  const uploadToken = "vercel_blob_rw_lUSA2go8ipySDpex_w6tss9owH4MW6R9MMQNpNOMIghabA3";
  if (!uploadToken) {
    console.error("Upload token not found!");
    return next(new ErrorHandler("Upload token is missing", 500));
  }

  // Handle new file uploads
  if (req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        console.log("Uploading:", file.originalname);
        // Upload the file to Vercel Blob
        const upload = await put(file.originalname, file.buffer, { access: 'public', token: uploadToken });
        const url = upload.url;
        images.push({ image: url });
      }
    } catch (error) {
      console.error("Upload error:", error);
      return next(new ErrorHandler("Image upload failed", 500));
    }
  }

  // Assign the new images to req.body
  req.body.images = images;

  // Update the blog with the new data
  blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    blog
  });
});






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

