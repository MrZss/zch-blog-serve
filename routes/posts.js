const PostModel = require('../models/post')

module.exports = {
  async create (ctx, next) {
    if (ctx.method === 'POST') {
      console.log(ctx.request.body)
      const post = Object.assign(ctx.request.body, {
        author: ctx.session.user._id
      })
      const res = await PostModel.create(post)
      ctx.body = { success: '发表文章成功' }
      console.log(res)
    }
  }
}
