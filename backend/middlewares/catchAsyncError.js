
// This code exports a middleware function that catches errors from the wrapped function and passes them to the next middleware.

module.exports = func =>(req,res,next)=>{
    return Promise.resolve( func (req,res,next)).catch(next);
}