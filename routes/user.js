const UserModel = require('../models/user')

module.exports = {
  async signup (ctx, next) {
    const user = {
      name: 'liuxing',
      email: 'chn.liuxing@gmail.com',
      password: '123456'
    }
    const result = await UserModel.create(user)
    ctx.body = result
  }
}
