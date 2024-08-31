const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },

  body: {
    type: String,
    required: [true, "Please enter body of the blog"],
  },
  images: [
    {
      image: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter blog  category"],
    enum: {
      values: [
        "Travel Blogs",
        "Food Blogs",
        "Fashion Blogs",
        "Lifestyle Blogs",
        "Fitness Blogs",
        "Parenting Blogs",
        "Tech Blogs",
        "Finance Blogs",
        "DIY/Craft Blogs",
        "Book Blogs",
      ],
      message: "Please select correct category",
    },
  },

  author:{
    type:String,
    required:[true,"Please enter authors name"]
  },

  authorId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users'
  },

  createdAt:{
    type:Date,
    default:Date.now()
  }
});



let blogSchemaModel= mongoose.model('blog',blogSchema)        // Creating a Mongoose model from the schema

module.exports = blogSchemaModel;
