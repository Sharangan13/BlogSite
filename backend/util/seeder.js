const connectDatabase = require('../config/database');
const blogs = require('../data/data.json');
const blog = require('../models/blogModel');
const dotenv = require('dotenv');

dotenv.config({path:'backend/config/config.env'})

connectDatabase()

const seederBlogs = async ()=>{
    try{
        await blog.deleteMany();
        console.log("All blogs are deleted");
        await blog.insertMany(blogs);
        console.log("All Blogs are added");
    } catch(error){
        console.log(error.message);
    }
    process.exit();
}

seederBlogs();