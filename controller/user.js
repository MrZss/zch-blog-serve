const UserModel = require('../models/user')
// const config = require('../configs')
const bcrypt = require('bcryptjs')

class UserController {
  // 创建用户
  static async signup (ctx) {
    const salt = await bcrypt.genSalt(10)
    let {
      name,
      email,
      password
    } = ctx.request.body
    password = await bcrypt.hash(password, salt)
    // 加密过程需放在前端执行  目前只针对后端
    const user = {
      name,
      email,
      password
    }
    await UserModel.create(user).catch(() => {
      ctx.throw(500, '创建失败')
    })
    ctx.success({
      msg: '创建用户成功！',
      success: true
    })
  }
  // 登录
  static async signin (ctx) {
    const {
      name,
      password
    } = ctx.request.body
    const user = await UserModel.findOne({
      name
    }).catch(() => {
      ctx.throw(500, '登录失败')
    })
    if (user && await bcrypt.compare(password, user.password)) {
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email
      }
      ctx.success({
        msg: '用户登录成功！',
        success: true
      })
      // 登录成功 把用户信息存进session
    } else {
      ctx.success({
        msg: '密码错误！请重新登录',
        success: false
      })
    }
  }
  // 注销
  static async signout (ctx) {
    ctx.session = null
    ctx.success({
      success: true
    })
  }
}

exports = module.exports = UserController
