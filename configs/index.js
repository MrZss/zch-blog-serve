// module.exports = {
//   port: process.env.PORT || 3000,
//   session: {
//     key: 'blog',
//     maxAge: 86400000
//   },
//   mongodb: 'mongodb://localhost:27017/blog'
// }

let config = {
  admin: {
    username: 'admin',
    password: 'admin',
    name: 'sinner77'
  },
  jwt: {
    secret: 'secret',
    exprisesIn: '3600s' // 以秒为单位
  },
  session: {
    key: 'blog',
    maxAge: 86400000
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'blog',
    port: 27017
    // user: '',                    //非必填
    // password: ''                 //非必填
  },
  app: {
    port: process.env.PORT || 3000,
    routerBaseApi: '/api'
  }
}

module.exports = config
