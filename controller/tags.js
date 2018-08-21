const CategoryModel = require('../models/category')

module.exports = {
  async list (ctx, next) {
    const categories = await CategoryModel.find({})
    if (!categories) {
      ctx.body = {
        success: false,
        msg: '查询失败！'
      }
      return
    }
    let data = {
      success: true,
      data: categories
    }
    ctx.body = data
  },
  async create (ctx, next) {
    if (ctx.method === 'POST') {
      await CategoryModel.create(ctx.request.body)
      let data = {
        success: true
      }
      ctx.body = data
    }
  },
  async delete (ctx, next) {
    await CategoryModel.findById.findByIdAndRemove(ctx.request.body.id)
    let data = {
      success: true
    }
    ctx.body = data
  }
}
