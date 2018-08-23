const Koa = require('koa')
const app = new Koa()
// const path = require('path')
// const serve = require('koa-static')
// const views = require('koa-views')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const router = require('./routes')
const response = require('./middlewares/response.js')
const CONFIG = require('./configs')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./middlewares/errorHandle.js')
// 配置数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongoUrl = `mongodb://@${CONFIG.mongodb.host}:${CONFIG.mongodb.port}/${CONFIG.mongodb.database}`
mongoose.connect(mongoUrl)
const db = mongoose.connection
db.on('error', () => {
  console.log('数据库连接出错!')
})
db.once('open', () => {
  console.log('数据库连接成功！')
})
// 加载中间件
// 记录请求记录 花费时间
app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
  console.log('出来了')
})
app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge
}, app))
app.use(bodyParser())

app.use(response)

app.use(errorHandle)
// session
app.keys = ['somethings']
console.log(444)
app.use(logger())
app.use(koaBody({multipart: true}))

// // static
// app.use(serve(path.join(__dirname, '/public')))
//
// // views
// app.use(views(path.join(__dirname, 'view'), {extension: 'nunjucks'}))

// error
onerror(app)

// router

router(app)

// app.listen(CONFIG.port, () => {
//   console.log(`Server running at http://127.0.0.1:${CONFIG.port}/`)
// })

app.listen(CONFIG.app.port, () => {
  console.log('The server is running at http://127.0.0.1:' + CONFIG.app.port)
})
