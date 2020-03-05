const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi=require('joi')
const registerSchema=mongoose.Schema({
    full_name:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        require:true
    },
    is_active:{
        type:Date,
        default:Date.now
    }
})
registerSchema.methods.genrate= function (){
    return jwt.sign({_id:this._id,full_name:this.full_name,email:this.email },'jwtPrivateKey')
}
const register=mongoose.model('Register',registerSchema)

const valiadtorRegister=function(user){
    const registerUser={
        full_name:Joi.string().required(),
        gender:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(5)
    }
    return Joi.validate(user,registerUser)
}

module.exports.register=register;
module.exports.validate=valiadtorRegister;