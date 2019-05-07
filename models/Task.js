const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createError = require('http-errors')

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

// Handling errors from Mongoose in a friendly way
taskSchema.post('save', async function (error, doc, next) {
  // Errors thrown by Mongoose
  for (const err in error.errors) {
    if (err === 'name') throw createError(400, 'Task requires a name')
  }
})

// Throws error if not found
taskSchema.post('findOne', async function (doc, next) {
  if (!doc) throw createError(404, 'Task does not exist')
})

// Handle casting error
taskSchema.post('findOne', async function (error, doc, next) {
  if (error.name === 'CastError' && error.path === '_id') {
    throw createError(404, 'Task does not exist')
  }
})
// Transforming allows us to beautify the options so
// we don't have to change them ourselves in every return call
// 1. Changes _.id to id (but preserves _id for tests. This won't be shown to public)
// 2. Removes __v
taskSchema.set('toJSON', {
  transform (doc, ret) {
    return {
      id: ret._id,
      name: ret.name,
      done: ret.done
    }
  }
})

module.exports = mongoose.model('Task', taskSchema)
