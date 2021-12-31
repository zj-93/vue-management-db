/**
 *  路由模块
 */

 const url = require('url')
 const requestHandler = require('./requestHandler.js')
 const routeMap = require('../api/api.js').routeMap // api路由映射表
 
 const getHandler = (key) => {
     return requestHandler[key]
 }
 
 const apiServer = (request, response) => {
     let requestUrl = url.parse(request.url).pathname
     let requestName = requestUrl.replace('/admin', '')
     let route = routeMap[requestName] || {}
     let handler = getHandler(route.handler)
     if (typeof handler === 'function') {
         // 是否需要验证登录态
         if (route.needVerify) {
             requestHandler.verifyLogin(request, response, handler)
         } else {
             handler(request, response)
         }
     } else {
         getHandler('noHandler')(request, response)
     }
 }
 
 exports.apiServer = apiServer