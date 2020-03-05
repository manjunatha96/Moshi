require('express-async-errors')
const registerController=require('../Controller/registerController')
const loginController=require('../Controller/login')
const error=require('../Middleware/error')
module.exports=function(app){
    app.use('/register',registerController)
    app.use('/login',loginController)
    app.use(error)
}