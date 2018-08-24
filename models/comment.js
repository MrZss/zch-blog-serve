const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

exports = module.exports = mongoose.model('comment', commentSchema)
