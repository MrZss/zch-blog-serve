const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = {
  async signup (ctx, next) {
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
}
