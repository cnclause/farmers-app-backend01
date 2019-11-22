const { verify } = require('../auth/utils')

// will grab auth header from req and verify it
async function checkAuthHeaderSetUser(req, res, next) {
    const authorization = req.get('authorization')
    // console.log('authhead', authorization)
    if(authorization) {
        const token = authorization.split(' ')[1]
        try {
            const user = await verify(token)
            req.user = user
            console.log("user", user)
        } catch (error) {
            console.log(error)
        }
    }
    next()
}

async function checkAuthHeaderSetUserUnAuthorized(req, res, next){
    const authorization = req.get('authorization')
    if(authorization) {
        const token = authorization.split(' ')[1]
        try {
            const user = await verify(token)
            req.user = user
            return next()
        } catch (error) {
            console.log(error)
        }
    }
    res.status(401)
    next(new Error('un-authorized'))
}


// catch 404 and forward to error handler
function notFound(req, res, next){
    const error = new Error('Not Found:' + req.originalUrl)
    res.status(404)
    next(error)
}
  
  // error handler
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      error: err.statusCode
    });
  };







module.exports = {
    notFound,
    errorHandler,
    checkAuthHeaderSetUser,
    checkAuthHeaderSetUserUnAuthorized
}