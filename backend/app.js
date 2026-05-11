const express = require('express');
const app = express();
const blog = require('./routes/blogRoute');
const user = require('./routes/userRoute');
const middlewareError = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

// CORS — allow React dev server in development
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    }));
}

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/sh/', blog);
app.use('/api/sh/', user);

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

app.use(middlewareError);
module.exports = app;
