const db = require("../../module/db/db.js")
const jsonParse = require('../../lib/jsonParse.js')
const axios = require("../../lib/params.js")

const users = db.getSchema("users")

process.on('unhandledRejection', error => {
  console.log('我帮你处理了', error.message);
})

/** 查询用户账号是否存在 */
function findUser(params) {
  return new Promise((resolve, reject) => {
    const userName = params.userName
    users.find({
      'userName': userName
    }).exec(function (err, data) {
      resolve(data)
    })
  })
}

/**查询用户账号密码是否匹配 */
function findPass(params) {
  return new Promise((resolve, reject) => {
    const passWord = params.passWord
    const userName = params.userName
    users.find({
      'userName': userName,
      'passWord': passWord
    }).exec(function (err, data) {
      resolve(data)
    })
  })
}

module.exports = {
  async signIn(request, response, handler) {
    let param = await axios.grabPostParams(request)
    findUser(param).then(res => {
      console.log(res)
      if (res.length) {
        findPass(param).then(res => {
          jsonParse.sendResult(response, 200, '登陆成功', )
        })
      } else {
        jsonParse.sendResult(response, 0, '未查询到该用户', )
      }
    })
  },
  async signUp(request, response, handler) {
    let param = await axios.grabPostParams(request)
    findUser(param).then(res => {
      if(res.length) {
        jsonParse.sendResult(response, 0, '该用户已存在', )
      } else {
        let user = new users({
          userName: param.userName,
          passWord: param.passWord
        })
        user.save(function (err, res) {
          if (err) {
            jsonParse.sendResult(0, '该用户已存在', )
          } else {
            jsonParse.sendResult(response, 200, '注册成功', )
          }
  
        })
      }
      
    })
  }
}