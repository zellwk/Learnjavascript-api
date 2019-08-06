const createError = require('http-errors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Models
const Task = require('./Task')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

// Methods
userSchema.methods.generatePasswordHash = function (password, cb) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

userSchema.methods.verifyPassword = function (password, cb) {
  return bcrypt.compareSync(password, this.password)
}

// Hashes passwords automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = this.generatePasswordHash(this.password)
})

// Creates 3 new tasks for every new user created.
// So students can learn to query for tasks immediately without
// having to create them first
userSchema.post('save', async function (doc) {
  const tasksToCreate = [
    { name: 'Learn JavaScript for 30 minutes', user: this },
    { name: 'Build a todolist', user: this },
    { name: 'Drink water', user: this }
  ]

  await Task.create(tasksToCreate)
})

// Handling errors from Mongoose in a friendly way
userSchema.post('save', async function (error, doc, next) {
  // Errors thrown by Mongoose
  for (const err in error.errors) {
    if (err === 'username') throw createError(400, 'Username required')
    if (err === 'password') throw createError(400, 'Password required')
  }

  if (error.code === 11000 && error.errmsg.includes('username')) {
    throw createError(400, 'Username already exists')
  }
})

// Throws error if not found
userSchema.post('findOne', async function (doc, next) {
  if (!doc) throw createError(404, 'User not found')
})

userSchema.post('remove', async function (doc) {
  await Task.deleteMany({ user: doc.id })
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
userSchema.set('toObject', {
  transform (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
    return ret
  }
})

module.exports = mongoose.model('User', userSchema)
