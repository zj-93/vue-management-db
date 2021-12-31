// api路由映射表
// needVerify: 是否需要验证登录态

const routeMap = {
  '/signIn': {
    handler: 'signIn',
    needVerify: false
  }
}

exports.routeMap = routeMap