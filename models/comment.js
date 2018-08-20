const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  postId: {
    type: Schema.Type.ObjectId,
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

module.exports = mongoose.model('Comment', CommentSchema)
