const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', require('./home').index)
  router.post('/signup', require('./user').signup)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
