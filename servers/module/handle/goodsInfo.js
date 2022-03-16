const db = require("../../module/db/db.js")
const jsonParse = require('../../lib/jsonParse.js')
const axios = require("../../lib/params.js")

const phoneInfo = db.getSchema("phoneInfo") // 手机
const notebookInfo = db.getSchema("notebookInfo") // 笔记本
const makeupInfo = db.getSchema("makeupInfo") // 美妆
const phoneDetail = db.getSchema("phoneDetail") // 手机详情



module.exports = {
    phoneInfo,
    async getGoods(request, response, handler) {
        let params = await axios.grabPostParams(request)
        let body = params.name ? {
            goodsType: params.type,
            goodsTitle: new RegExp(params.name)
        } : {
            goodsType: params.type
        }
        let dbFn = phoneInfo
        if(params.type == 1) {
            dbFn = phoneInfo
        } else if(params.type == 2) {
            dbFn = notebookInfo
        } else if(params.type == 3) {
            dbFn = makeupInfo
        }
        dbFn.find(body).exec(function (err, data) {
            jsonParse.sendResult(response, 200, data, '查询成功')
        })
    },

    async getGoodsDetail(request, response, handler) {
        let params = await axios.grabPostParams(request)
        let body = {
            goodsCode: params.goodsCode
        }
        phoneDetail.find(body).exec(function(err, data){
            jsonParse.sendResult(response, 200, data, '查询成功')
        })
    }
}