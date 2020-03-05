require('winston-mongodb')
const winston=require('winston')
const DB_URL=require('../Config/DbURL')

module.exports=function(){
     winston.add(winston.transports.File,{filename:"logfile.log"})
   winston.add(winston.transports.MongoDB,{db:DB_URL.URL,
        collection: 'log',
        level: 'info',
        storeHost: true,
        capped: true,
        })

    winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtException.log'}))
    }