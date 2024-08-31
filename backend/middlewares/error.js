module.exports = (err,req,res, next)=>{

    err.statusCode =err.statusCode || 500
    
    // Handling errors in the development environment 

    if(process.env.NODE_ENV == 'development'){

        res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack:err.stack
        })
    }




    


    // Handling errors in the production environment

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error =new Error(message);


        // Handling Mongoose validation errors
        if(err.name=="ValidationError"){
            message = Object.values(err.errors).map(value=>value.message);
            error = new Error(message);
            err.statusCode = 400;
            
        }

        // Handling Mongoose CastError
        if(err.name=="CastError"){
            message = `Resource not found : ${err.path}`;
            error = new Error(message);
            err.statusCode = 400;
            
        }

        
        
        // // Handling duplicate key errors
        // if(err.code == 11000) {
        //     let message = `Duplicate ${Object.keys(err.keyValue)} error`;
        //     error = new Error(message)
        //     err.statusCode = 400
        // }



        // Handling invalid JSON Web Token errors
        if(err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        // Handling expired JSON Web Token errors        
        if(err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        // Sending generic error message in production mode
        res.status(err.statusCode).json({
            success:false,
            message:err.message ||"Internal server Error......."
          
        })
    }

   

}