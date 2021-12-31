/**
 *  json响应处理
 */

const document = require('../api/document.js')

const getResultJsonStr = (code = -1, data = [], page = {
    current: 1,
    pageSize: 10,
    total: 0
}) => {
    return {
        status: code === 200 ? 'ok' : 'error',
        msg: document.list[code] || document.list[-1],
        code,
        data,
        page
    }
}

const sendJson = (response, json) => {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    })
    response.end(JSON.stringify(json))
}

const sendResult = (response, code = -1, data = '', page) => {
    sendJson(response, getResultJsonStr(code, data, page))
}

module.exports = {
    getResultJsonStr: getResultJsonStr,
    sendJson: sendJson,
    sendResult: sendResult
}