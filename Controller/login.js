const express=require('express')
const router=express.Router()
const {register} =require('../Model/register')
const bcrypt=require('bcryptjs')
const Joi=require('joi')

router.get('/logins', async(req,res)=>{
    res.send('hii')
})

router.post('/posting', async(req,res)=>{

    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)


    const valid= await register.findOne({email:req.body.email})
    if(!valid) res.status(401).send('Invalid email id..')

    const pass=await bcrypt.compare(req.body.password,valid.password)
    if(!pass) res.status(401).send('Invalid password..')
    const token= valid.genrate()
   
    res.send({token})
})

const validate=function(users){
    const loginValiadtion={
        email:Joi.string().required().email(),
        password:Joi.string().required().min(5)
    }
    return Joi.validate(users,loginValiadtion)
}

module.exports=router;