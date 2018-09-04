const mongoose = require('mongoose')
const createError = require('http-errors')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username not provided!',
    unique: true
  }
})

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(createError(400, 'Username already exists'))
  }
  next(error)
})

// Virtual for 1 to many relationships
// Virtual means we don't store the references in database.
// Three things required to use virtual:
//   1. userSchema.virtual
//     1. localField set to the property to look for to populate. This is usually _id because Mongoose looks for ObjectID automatically (provided you provide it to the model)
//     2. ForeignField is the Ref you set for the other model (see Ref). This should be lowercased.
//   2. set Ref to User
//   3. find().populate('refToPopulate').exec()
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'user'
})

// Allows populating when converting to object
userSchema.set('toObject', { getters: true })

module.exports = mongoose.model('User', userSchema)
