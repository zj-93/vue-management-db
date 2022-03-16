// api路由映射表
// needVerify: 是否需要验证token

const routeMap = {
  '/signIn': {
    handler: 'signIn',
    needVerify: false
  },
  '/signUp': {
    handler: 'signUp',
    needVerify: false
  },
  '/resetToken': {
    handler: 'resetToken',
    needVerify: false
  },
  '/getUser': {
    handler: 'getUser',
    needVerify: false
  },
  '/getGoods': { // 获取商品
    handler: 'getGoods',
    needVerify: false
  },
  '/getGoodsDetail': { // 商品详情
    handler: 'getGoodsDetail',
    needVerify: true
  },
  '/addGoodsToCar': { // 添加购物车
    handler: 'addGoodsToCar',
    needVerify: true
  },
  '/getGoodsCarNum': { // 获取购物车数量
    handler: 'getGoodsCarNum',
    needVerify: true
  },
  '/getGoodsCarDetail': { // 获取购物车详情
    handler: 'getGoodsCarDetail',
    needVerify: true
  }
}

exports.routeMap = routeMap