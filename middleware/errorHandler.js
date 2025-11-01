const errorHandler=(err,req,res,next)=>{
    console.log(err.stack);
    let statusCode=res.statusCode === 200 ? 500: res.statusCode;
    let message=err.message;

    if(err.name==='CaseError' && err.kind==='ObjectId'){
        statusCode=404;
        message="Resources Not Found. Invalid ID Format";
    }
    if(err.name==='Validation Error'){
        statusCode=400;
        message=Object.values(err.errors).map(val => val.message).join(', ');
    }

    res.status(statusCode).json({
        message:message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = errorHandler;