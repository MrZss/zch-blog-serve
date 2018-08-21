const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
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

module.export = mongoose.model('Category', CategorySchema)