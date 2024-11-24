module.exports = (error,req,res,next)=>{
    let status = error.status || 500
    let description = error.description || {ErrorType: error.name}
    console.log(`From custom error: ${error}`)
    res.status(status).json({
        status:status, Error: description
    })
}