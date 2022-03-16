/**
 *  DB类
 */

 const mongoose = require('mongoose')
 const schemaList = require('./schemaList.js')
 
 const connectMongoDb = (database = 'vite', success, error) => {
 
     const db = mongoose.connection
     mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
         useCreateIndex: true,
         useNewUrlParser: true,
         keepAlive: true,
        //  reconnectTries: 30,
         socketTimeoutMS: 5000,
         useUnifiedTopology: true
     })
 
     db.on('open', () => {
         console.log(`db ${database} connect success`)
         typeof success === 'function' && success()
     })
 
     db.on('error', () => {
         console.log(`db ${database} connect failed, make sure your device had correctly installed MongoDB , 
         learn more 'https://blog.csdn.net/qq_27378621/article/details/80933354'`)
         typeof error === 'function' && error()
     })
 
     db.on('close', () => {
         console.log(`db ${database} connect close`)
     })
 
 }
 
 const closeMongoDb = () => {
     mongoose.connection.close()
 }
 
 const getSchema = (schema, useCreateIndex = false) => {
     console.log(schema)
     if (schema && schemaList[schema]) {
         // mongoose.set('useCreateIndex', useCreateIndex)
        return mongoose.model(schema, schemaList[schema], schema)
     } else {
         return false
     }
 }
 
 module.exports = {
     connectMongoDb: connectMongoDb,
     closeMongoDb: closeMongoDb,
     getSchema: getSchema
 }