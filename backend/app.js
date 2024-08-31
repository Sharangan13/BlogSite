const express = require('express');
const app = express();
const blog = require('./routes/blogRoute');
const user = require('./routes/userRoute');
const middlewareError = require('./middlewares/error');
const cookieParser= require("cookie-parser")
const path = require("path")

app.use(express.json());
app.use(cookieParser());
app.use('/upload',express.static(path.join(__dirname,'upload')))

app.use('/api/sh/',blog);
app.use('/api/sh/',user)

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
    console.log(`Environment: is ..................${process.env.NODE_ENV}`)
}

app.use(middlewareError);
module.exports = app;