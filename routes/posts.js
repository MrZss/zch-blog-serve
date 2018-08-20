const PostModel = require('../models/post')

module.exports = {
  async create (ctx, next) {
    if (ctx.method === 'POST') {
      console.log(ctx.request.body)
      const post = Object.assign(ctx.request.body, {author: ctx.session.user._id})
      const res = await PostModel.create(post)
      ctx.body = {
        success: true
      }
      console.log(res)
    }
  },
  async detail (ctx, next) {
    if (ctx.method === 'POST') {
      const post = await PostModel.findById(ctx.request.body.id).populate({path: 'author', select: 'name'})
      let detail = {
        success: true,
        data: {
          title: post.title,
          post
        }
      }
      ctx.body = detail
    }
  },
  async list (ctx, next) {
    if (ctx.method === 'POST') {
      const posts = await PostModel.find({})
      let list = {
        success: true,
        data: {
          title: posts.title,
          posts
        }
      }
      ctx.body = list
    }
  },
  async checkAccess (ctx, next) {
    if (ctx.method === 'POST') {
      const post = await PostModel.findById(ctx.request.body.id)
      if (!post) {
        ctx.body = {
          success: false,
          msg: '文章不存在！'
        }
      }
      if (post.author.toString() !== ctx.session.user._id.toString()) {
        ctx.body = {
          success: false,
          msg: '没有权限！'
        }
      }
    }
  },
  async update (ctx, next) {
    if (ctx.method === 'POST') {
      console.log(123)
      const post = await PostModel.findById(ctx.request.body.id)
      if (!post) {
        ctx.body = {
          success: false,
          msg: '文章不存在！'
        }
      }
      if (post.author.toString() !== ctx.session.user._id.toString()) {
        ctx.body = {
          success: false,
          msg: '没有权限！'
        }
      }
      const { title, content } = ctx.request.body
      await PostModel.findByIdAndUpdate(ctx.request.body.id, {
        title,
        content
      })
      ctx.body = {
        success: true
      }
    }
  },
  async delete (ctx, next) {
    const post = await PostModel.findById(ctx.request.body.id)
    if (!post) {
      ctx.body = {
        success: false,
        msg: '文章不存在！'
      }
    }
    if (post.author.toString() !== ctx.session.user._id.toString()) {
      ctx.body = {
        success: false,
        msg: '没有权限！'
      }
    }
    await PostModel.findByIdAndRemove(ctx.params.id)
    ctx.body = {
      success: true
    }
  }
}
