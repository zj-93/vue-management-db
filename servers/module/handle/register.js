const db = require("../../module/db/db.js")
const jsonParse = require('../../lib/jsonParse.js')
const axios = require("../../lib/params.js")
const jwt = require('jsonwebtoken');
const sd = require('silly-datetime')

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

/** token生成 */
function createToken(rule, time) {
  return new Promise((resolve, reject) => {
    jwt.sign(rule, 'secret', {
      expiresIn: time || 3600
    }, (err, token) => {
      if (err) {
        resolve('')
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  // 登录接口
  async signIn(request, response, handler) {
    let param = await axios.grabPostParams(request)
    findUser(param).then(res => {
      if (res.length) {
        findPass(param).then(res => {
          const rule = {
            userName: param.userName
          }
          createToken(rule).then(token => {
            jsonParse.sendResult(response, 200, {
              token: "dj" + token
            }, '登录成功')
          })
        })
      } else {
        jsonParse.sendResult(response, 0, '未查询到该用户', )
      }
    })
  },

  // 重新登录
  async resetToken(request, response, handler) {
    let token = request.headers['x-token'].replace('dj', '');
    const decodeResult = jwt.decode(token)
    const rule = {
      userName: decodeResult.userName
    }
    createToken(rule, 3600).then(token => {
      jsonParse.sendResult(response, 200, {
        token: "dj" + token
      }, '重新登录成功')
    })
  },

  // 获取
  async getUser(request, response, handler) {
    users.find().exec(function (err, data) {
      jsonParse.sendResult(response, 200, data)
    })
  },

  // 注册接口
  async signUp(request, response, handler) {
    let param = await axios.grabPostParams(request)
    if(!param.userName) {
      jsonParse.sendResult(0, '用户名为空', )
    }
    if(!param.passWord) {
      jsonParse.sendResult(0, '密码为空', )
    }
    findUser(param).then(res => {
      if (res.length) {
        jsonParse.sendResult(response, 0, '该用户已存在', )
      } else {
        let user = new users({
          userName: param.userName,
          passWord: param.passWord,
          createTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          vipLv: '00001'
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