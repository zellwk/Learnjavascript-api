const mongoose = require('../helpers/mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const taskSchema = new Schema({
  done: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Transforming allows us to beautify the options so we don't have to change them ourselves in every return call
// (For example, the following returns only the properties mentioned below. _id and __v are removed)
taskSchema.set('toObject', {
  transform (doc, ret) {
    return {
      id: ret._id,
      name: ret.name,
      done: ret.done
    }
  }
})

module.exports = mongoose.model('Task', taskSchema)
