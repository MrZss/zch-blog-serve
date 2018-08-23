const UserModel = require('../models/user')
// const config = require('../configs')
const bcrypt = require('bcryptjs')

class UserController {
  static async signup (ctx, next) {
    console.log(333)
    if (ctx.method === 'POST') {
      const salt = await bcrypt.genSalt(10)
      let {name, email, password} = ctx.request.body
      password = await bcrypt.hash(password, salt)
      // 加密过程需放在前端执行  目前只针对后端
      const user = {
        name,
        email,
        password
      }
      console.log(user)
      // 存储数据库
      const result = await UserModel.create(user)
      ctx.body = result
    }
  }
  static async signin (ctx, next) {
    if (ctx.method === 'POST') {
      console.log(ctx.request.body)
      const {name, password} = ctx.request.body
      const user = await UserModel.findOne({name})
      if (user && await bcrypt.compare(password, user.password)) {
        ctx.session.user = {
          _id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          email: user.email
        }
        ctx.body = '登录成功'
        // 登录成功 把用户信息存进session
      } else {
        ctx.body = '用户名或密码错误'
      }
    }
  }
  static async signout (ctx, next) {
    ctx.session = null
    ctx.body = {
      success: true
    }
  }
}
exports = module.exports = UserController
