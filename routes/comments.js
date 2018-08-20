const CommentModel = require('../models/comment')

module.exports = {
  async create (ctx, next) {
    const comment = Object.assign(ctx.request.body, {from: ctx.session.user._id})
    await CommentModel.create(comment)
    ctx.body = {
      success: true
    }
  },
  async delete (ctx, next) {
    const comment = await CommentModel.findById(ctx.request.body.id)
    if (!comment) {
      ctx.body = {
        success: false,
        msg: '留言不存在'
      }
      return
    }
    if (comment.from.toString() !== ctx.session.user._id.toString()) {
      ctx.body = {
        success: false,
        msg: '没有权限'
      }
      return
    }
    await CommentModel.findByIdAndRemove(ctx.request.body.id)
    ctx.body = {
      success: true
    }
  }
}
