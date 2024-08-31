const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database.js');


dotenv.config({path:path.join(__dirname,"config","config.env")});

connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server listening to the port: ${process.env.PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
});


process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting dow the server due to unhandle Rejection Error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting dow the server due to uncaught Exception Error');
    server.close(()=>{
        process.exit(1);
    })
})



