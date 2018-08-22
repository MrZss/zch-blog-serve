const CommentModel = require('../models/comment')

class commentController {
  static async createComment (ctx, next) {
    const comment = Object.assign(ctx.request.body, {from: ctx.session.user._id})
    await CommentModel.create(comment)
    ctx.body = {
      success: true
    }
  }
  static async deleteComment (ctx, next) {
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
exports = module.exports = commentController
