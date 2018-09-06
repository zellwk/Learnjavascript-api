const Task = require('../../models/Task')
const User = require('../../models/User')
const createError = require('http-errors')

module.exports = {
  // Todo: Get tasks that are done
  async getTasks (req, res) {
    const { username } = req.params

    const user = await User.findOne({ username }).populate('tasks').exec()
    const tasks = user.toObject({ getters: true }).tasks
    return res.json(tasks)
  },

  async createTask (req, res) {
    const { name, done } = req.body
    const { username } = req.params

    const user = await User.findOne({ username })
    if (!user) throw createError(400, 'Cannot create tasks for a user that does not exists')

    const newTask = new Task({ name, done, user })
    const doc = await newTask.save()
    return res.json(doc.toObject())
  },

  editTask (req, res, next) {
    const { id: _id } = req.params
    const { name, done } = req.body

    Task.findOneAndUpdate({ _id }, { name, done }, { new: true })
      .then(doc => res.json(doc))
      .catch(next)
  },

  deleteTask (req, res, next) {
    const { id: _id } = req.params

    Task.findOneAndDelete({ _id })
      .then(doc => {
        if (!doc) return next(createError(404, 'Task not found'))
        res.json({
          message: 'Task deleted',
          deletedTask: doc
        })
      })
      .catch(next)
  }
}
