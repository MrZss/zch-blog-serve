const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    typr: String
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

exports = module.exports = mongoose.model('tag', tagSchema)
