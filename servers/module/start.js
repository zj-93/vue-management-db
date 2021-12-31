const Http = require('http')
const Route = require('./route')

const port = 3001

const httpStart = () => {
  // 创建 HTTP 服务
  const server = Http.createServer((request, response) => {
    Route.apiServer(request, response) // 普通HTTP服务
  }).listen(port, function () {
    console.log('创建HTTP')
    console.log(`server is running on http://localhost:${port}`)
  })

  return server
}

exports.httpStart = httpStart
