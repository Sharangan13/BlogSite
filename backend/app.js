const express = require('express');
const app = express();
const blog = require('./routes/blogRoute');
const user = require('./routes/userRoute');
const middlewareError = require('./middlewares/error');
const cookieParser= require("cookie-parser")
const path = require("path")
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express.json());
app.use(cookieParser());
app.use('/upload',express.static(path.join(__dirname,'upload')))

app.use('/api/sh/',blog);
app.use('/api/sh/',user)

dotenv.config({path:path.join(__dirname,"config","config.env")});

// process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// if(process.env.NODE_ENV ==='production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
//     })
//     console.log(`Environment: is ..................${process.env.NODE_ENV}`)
// }

if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname,'/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build/index.html'))
    })
    console.log(`Environment: is ..................${process.env.NODE_ENV}`)
}

app.use(middlewareError);
const corsOptions = {
    origin: 'https://blog-site-two-tau.vercel.app',
    credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));

module.exports = app;