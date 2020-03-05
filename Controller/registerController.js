const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const {register,validate} =require('../Model/register')

router.get('/get',async(req,res)=>{
    let results=await register.find()
    await res.send(results)
})

router.post('/post',async(req,res)=>{

    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const valid=await register.findOne({email:req.body.email})
    if(valid) res.status(400).send('Email already exits..')
    
    const result=new register({
        full_name:req.body.full_name,
        gender:req.body.gender,
        email:req.body.email,
        password:req.body.password
    })
    const salt=await bcrypt.genSalt(10)
    result.password= await bcrypt.hash(result.password,salt)
    result.save()
    const token= result.genrate()
    res.send({token})
})

module.exports=router