/**
 *  请求处理器模块
 */

const jsonParse = require('../lib/jsonParse.js')
const db = require('../module/db/db.js')
const jwt = require('jsonwebtoken');

const register = require('./handle/register.js')
const goodsInfo = require('./handle/goodsInfo.js')
const shopCar = require('./handle/shopCar.js')



// 连接DB
db.connectMongoDb('vite')

module.exports = {
    ...register, // 注册&&登录

    ...goodsInfo, // 物品信息

    ...shopCar, // 购物车
    // ...errorLog, // err模块

    // ...requests, // requests模块

    // ...login, // 登陆态模块

    // ...projects, // 项目配置模块

    // ...members, // 成员配置

    noHandler: (request, response) => {
        jsonParse.sendResult(response, 404)
    },
    verifyLogin: (request, response, handler) => {
        let token = request.headers['x-token'].replace('dj', '');
        jwt.verify(token, 'secret', function (err, data) {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    jsonParse.sendResult(response, 50014, 'token已过期')
                } else if (err.name == 'JsonWebTokenError') {
                    jsonParse.sendResult(response, 50008, '无效token')
                }
            } else {
                handler(request, response)
            }
        })
    }
}