/**
 *  请求处理器模块
 */

const jsonParse = require('../lib/jsonParse.js')
const db = require('../module/db/db.js')

const register = require('./handle/register.js')


// 连接DB
db.connectMongoDb('vite')

module.exports = {
    ...register, // 注册&&登录

    // ...errorLog, // err模块

    // ...requests, // requests模块

    // ...login, // 登陆态模块

    // ...projects, // 项目配置模块

    // ...members, // 成员配置

    noHandler: (request, response) => {
        jsonParse.sendResult(response, 404)
    },

}