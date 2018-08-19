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
  },
  async detail (ctx, next) {
    const post = await PostModel.findById(ctx.request.body.id)
      .populate({ path: 'author', select: 'name' })
    let detail = {
      title: post.title,
      post
    }
    ctx.body = detail
  },
  async list (ctx, next) {
    const posts = await PostModel.find({})
    ctx.body = posts
  }
}
