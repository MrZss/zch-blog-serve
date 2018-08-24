const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pv: {
    type: Number,
    default: 0
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'tag'
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

exports = module.exports = mongoose.model('article', articleSchema)
