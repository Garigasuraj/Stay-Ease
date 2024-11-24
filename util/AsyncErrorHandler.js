module.exports = (func)=>{
    // It will get called only the when route handler calls it
    return function(req,res,next){
        // this function is to exexute the passed function
        func(req,res,next).catch(error => next(error))
    }
}