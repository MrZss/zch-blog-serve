const Article = require('../models/article')
const Comment = require('../models/comment')

class ArticleController {
  // 创建文章
  static async createArticle (ctx) {
    console.log(ctx.request.body)
    const {
      title,
      content,
      tag
    } = ctx.request.body
    const article = new Article({
      title,
      content,
      tag,
      author: ctx.session.user._id
    })
    console.log(article)
    let result = await article.save().catch(() => {
      ctx.throw(500, '数据存储失败！')
    })
    await result.populate('tag').execPopulate().catch(() => {
      ctx.throw(500, '关联标签错误！')
    })
    ctx.success({
      msg: '文章创建成功！',
      success: true
    })
  }
  // 根据id获取文章
  static async getArticleById (ctx) {
    let id = ctx.request.body.id
    let article = await Article.findById(id).catch(() => {
      ctx.throw(500, '查询文章失败!')
    })
    await article.populate('tags').execPopulate().catch(() => {
      ctx.throw(500, '查询文章标签失败!')
    })
    const comments = await Comment.find({
      postId: ctx.request.body.id
    })
    ctx.success({
      msg: '查询成功!',
      success: true,
      data: {
        article,
        comments
      }
    })
  }
  // 获取全部文章
  static async getAllArticles (ctx) {
    let tagId = ctx.request.body.tag
    let page = +ctx.request.body.page
    let limit = +ctx.request.body.limit || 5
    if (page <= 0) {
      page = 1
    }
    if (tagId) {
      var result = await Article.find({
        tag: tagId
      }, {
        author: 0
      }).populate('tags').exec().catch(() => {
        ctx.throw(500, '标签查询文档失败!')
      })
    } else if (page && limit) {
      result = await Article.find({}, {
        author: 0
      }).sort({
        'createTime': -1
      }).skip(
        limit * (page - 1)
      ).limt(limit).populate('tags').exec().catch(() => {
        ctx.throw(500, '标签分页查询失败')
      })
      var total = await Article.count().exec().catch(() => {
        ctx.throw(500, '服务器内部错误-总数查询失败!')
      })
    } else {
      result = await Article.find({}, {
        author: 0
      }).sort({
        'createTime': -1
      }).populate('tags').exec().catch(() => {
        ctx.throw(500, '查找所有文章失败')
      })
    }
    ctx.success({
      msg: '查询发布的文章成功！',
      data: {
        success: true,
        result,
        total
      }
    })
  }
  // 更新文章
  static async updateArticle (ctx) {
    const {
      title,
      content,
      tag
    } = ctx.request.body
    let article = await Article.findByIdAndUpdate(ctx.request.body.id, {
      title,
      content,
      tag
    }).populate('tags').exec().catch(() => {
      ctx.throw(500, '更新文章失败')
    })
    console.log(article)
    ctx.success({
      msg: '修改成功!',
      article,
      success: true
    })
  }
  // 删除文章
  static async deleteArticleById (ctx) {
    const id = ctx.request.body.id
    await Article.findByIdAndRemove(id).exec().catch(() => {
      ctx.throw(500, '删除错误！')
    })
    ctx.success({
      msg: '删除文章成功!',
      success: true
    })
  }
}

exports = module.exports = ArticleController
