const mongoose=require('mongoose')
const DB_URL=require('../Config/DbURL')
const winston=require('winston')
module.exports= function() {
    mongoose.connect(DB_URL.URL,{ useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex: true})
    .then(()=>winston.info('Database connected successfully..'))  
}