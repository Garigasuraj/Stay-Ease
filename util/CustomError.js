module.exports = (error,req,res,next)=>{
    let status = error.status || 500
    const error_name  = error.name
    let description = error.description || {[error_name]: error.message}
    console.log(`From custom error: ${error}`)
    // res.status(status).json({
    //     status:status, description
    // })
    if(error.message){
        req.flash("error",error.message)
        return res.redirect(`${req.url}`)
    }
}