const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const taskSchema = new Schema({
  done: {
    type: Boolean,
    default: false
  },
  task: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Task', taskSchema)
