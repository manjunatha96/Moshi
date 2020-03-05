require('winston-mongodb')
const express=require('express')
const bodyPaser=require('body-parser')
const app=express()
const winston=require('winston')
const cors=require('cors')

app.use(cors())
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))

require('./Middleware/logs')()
require('./Database/DbConnection')()
require('./Router/router')(app)

const port=process.env.PORT || 3000;
app.listen(port,()=>winston.info(`Server listing on port ${port}`))