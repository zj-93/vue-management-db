const db = require("../../module/db/db.js")
const jsonParse = require('../../lib/jsonParse.js')
const axios = require("../../lib/params.js")
const jwt = require('jsonwebtoken');

const shopCars = db.getSchema("shopCar")
const phoneInfo = require('./goodsInfo').phoneInfo



process.on('unhandledRejection', error => {
    console.log(phoneInfo, 99)
    console.log('我帮你处理了', error.message);
})

module.exports = {
    async addGoodsToCar(request, response, handler) {
        let token = request.headers['x-token'].replace('dj', '');
        const decodeResult = jwt.decode(token)
        let userName = decodeResult.userName
        if (userName) {
            let param = await axios.grabPostParams(request)
            phoneInfo.find({goodsCode: param.goodsCode}).select({_id: 0}).exec(function(err, data){
                let temp = JSON.parse(JSON.stringify(data)) 
                let obj = {
                    userName: userName,
                    date: new Date().getTime(),
                    ...temp[0]
                }
                let shopCar = new shopCars(obj)
                shopCar.save(function (err, data) {
                    if (err) {
                        jsonParse.sendResult(0, '添加失败', )
                    } else {
                        jsonParse.sendResult(response, 200, '添加成功', )
                    }
                })
            })
            
        } else {
            jsonParse.sendResult(response, 0, '未登录', )
        }
    },
    getGoodsCarNum(request, response, handler) {
        let token = request.headers['x-token'].replace('dj', '');
        const decodeResult = jwt.decode(token)
        let userName = decodeResult.userName
        shopCars.find({
            userName: userName
        }).exec(function (err, data) {
            jsonParse.sendResult(response, 200, data.length, '查询成功')
        })
    },
    async getGoodsCarDetail(request, response, handler) {
        let token = request.headers['x-token'].replace('dj', '');
        const decodeResult = jwt.decode(token)
        let userName = decodeResult.userName
        shopCars.find({
            userName: userName
        }).exec(function (err, data) {
            if (data) {
                // let temp = data.map(e => {
                //     return e.goodsCode
                // })
                // phoneInfo.find({goodsCode: {$in: temp}}).sort('date').exec(function(err, data) {
                //     jsonParse.sendResult(response, 200, data, '查询成功')
                // })
            } else {

            }
        })
    }
}