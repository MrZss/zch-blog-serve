const ArticleModel = require('../models/article')
const CommentModel = require('../models/comment')

class ArticleController {
  // 创建文章
  static async createArticle (ctx, next) {
    console.log(ctx.request.body)
    const article = Object.assign(ctx.request.body, {author: ctx.session.user._id})
    const res = await ArticleModel.create(article)
    ctx.body = {
      success: true
    }
    console.log(res)
  }
  static async getArticleById (ctx, next) {
    if (ctx.method === 'POST') {
      const article = await ArticleModel.findById(ctx.request.body.id).populate({path: 'author', select: 'name'})
      const comments = await CommentModel.find({postId: ctx.request.body.id})
      let detail = {
        success: true,
        data: {
          title: article.title,
          article,
          comments
        }
      }
      ctx.body = detail
    }
  }
  static async getAllArticles (ctx, next) {
    if (ctx.method === 'POST') {
      const articles = await ArticleModel.find({})
      let list = {
        success: true,
        data: {
          articles
        }
      }
      ctx.body = list
    }
  }
  static async checkAccess (ctx, next) {
    if (ctx.method === 'POST') {
      const article = await ArticleModel.findById(ctx.request.body.id)
      if (!article) {
        ctx.body = {
          success: false,
          msg: '文章不存在！'
        }
        return
      }
      if (article.author.toString() !== ctx.session.user._id.toString()) {
        ctx.body = {
          success: false,
          msg: '没有权限！'
        }
      }
    }
  }
  static async updateArticle (ctx, next) {
    if (ctx.method === 'POST') {
      console.log(123)
      const article = await ArticleModel.findById(ctx.request.body.id)
      if (!article) {
        ctx.body = {
          success: false,
          msg: '文章不存在！'
        }
        return
      }
      if (article.author.toString() !== ctx.session.user._id.toString()) {
        ctx.body = {
          success: false,
          msg: '没有权限！'
        }
        return
      }
      const {title, content} = ctx.request.body
      await ArticleModel.findByIdAndUpdate(ctx.request.body.id, {title, content})
      ctx.body = {
        success: true
      }
    }
  }
  static async deleteArticleById (ctx, next) {
    const article = await ArticleModel.findById(ctx.request.body.id)
    if (!article) {
      ctx.body = {
        success: false,
        msg: '文章不存在！'
      }
      return
    }
    if (article.author.toString() !== ctx.session.user._id.toString()) {
      ctx.body = {
        success: false,
        msg: '没有权限！'
      }
      return
    }
    await ArticleModel.findByIdAndRemove(ctx.params.id)
    ctx.body = {
      success: true
    }
  }
}
exports = module.exports = ArticleController
