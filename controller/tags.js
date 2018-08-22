const tagModel = require('../models/tag')

class tagController {
  static async getAllTags (ctx, next) {
    const tags = await tagModel.find({})
    if (!tags) {
      ctx.body = {
        success: false,
        msg: '查询失败！'
      }
      return
    }
    let data = {
      success: true,
      data: tags
    }
    ctx.body = data
  }
  static async createTag (ctx, next) {
    if (ctx.method === 'POST') {
      await tagModel.create(ctx.request.body)
      let data = {
        success: true
      }
      ctx.body = data
    }
  }
  static async deleteTag (ctx, next) {
    await tagModel.findById.findByIdAndRemove(ctx.request.body.id)
    let data = {
      success: true
    }
    ctx.body = data
  }
}
exports = module.exports = tagController
