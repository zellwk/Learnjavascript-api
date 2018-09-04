const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const taskSchema = new Schema({
  done: {
    type: Boolean,
    default: false
  },
  task: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Transforming allows us to beautify the options so we don't have to change them ourselves in every return call
// (For example, the following returns only the properties mentioned below. _id and __v are removed)
taskSchema.options.toObject = {
  transform (doc, ret) {
    return {
      id: ret._id,
      task: ret.task,
      done: ret.done
    }
  }
}

module.exports = mongoose.model('Task', taskSchema)
