const Comment = require('../models/comment')

class commentController {
  // 创建评论
  static async createComment (ctx) {
    const comment = Object.assign(ctx.request.body, {
      from: ctx.session.user._id
    })
    let result = await Comment.create(comment)
    ctx.success({
      msg: '评论创建成功！',
      data: result,
      success: true
    })
  }
  // 删除评论
  static async deleteComment (ctx) {
    const comment = await Comment.findById(ctx.request.body.id).catch(() => {
      ctx.throw(500, '评论不存在')
    })
    if (comment.from.toString() !== ctx.session.user._id.toString()) {
      ctx.success({
        msg: '无权限删除此评论！',
        success: false
      })
    }
    await Comment.findByIdAndRemove(ctx.request.body.id).catch(() => {
      ctx.throw(500, '删除操作执行失败')
    })
    ctx.success({
      msg: '删除成功！',
      success: true
    })
  }
}
exports = module.exports = commentController
