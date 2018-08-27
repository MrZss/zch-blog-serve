const Tag = require('../models/tag')

class tagController {
  // 创建标签
  static async createTag (ctx) {
    const name = ctx.request.body.name
    let oldTag = await Tag
      .findOne({
        name
      })
      .exec()
      .catch(() => {
        ctx.throw(500, '查询失败!')
      })
    if (oldTag !== null) {
      return ctx.success({
        msg: '这是已经存在的标签！',
        data: oldTag,
        success: false
      })
    }
    let tag = new Tag({
      name
    })
    let result = await tag.save().catch(() => {
      ctx.throw(500, '创建标签失败！')
    })
    ctx.success({
      msg: '添加成功！',
      data: result,
      success: true
    })
  }
  // 获取所有标签
  static async getAllTags (ctx) {
    let result = await Tag.find()
    ctx.success({
      msg: '获得所有标签成功!',
      data: result,
      success: true
    })
  }
  // 修改标签名称
  static async updateTag (ctx) {
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    console.log(name)
    let result = await Tag
      .findByIdAndUpdate(id, {
        name
      }, {
        new: true
      })
      .exec()
      .catch(() => {
        ctx.throw(500, '更新失败!')
      })
    ctx.success({
      msg: '修改成功',
      data: result,
      success: true
    })
  }
  // 删除标签
  static async deleteTag (ctx) {
    const id = ctx.request.body.id
    await Tag
      .findByIdAndRemove(id)
      .exec()
      .catch(() => {
        ctx.throw(500, '服务器内部错误-delete错误!')
      })
    ctx.success({
      msg: '删除标签成功!',
      success: true
    })
  }
}
exports = module.exports = tagController
