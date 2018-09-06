const Task = require('../../models/Task')
const User = require('../../models/User')

module.exports = {
  async getUser (req, res) {
    const { username } = req.params
    const user = await User.findOne({ username })
    res.json(user)
  },

  async createUser (req, res) {
    const { username } = req.body
    const newUser = new User({ username })

    const doc = await newUser.save()
    return res.json(`User ${doc.username} created`)
  },

  async deleteUser (req, res) {
    const { username } = req.params

    // Delete all tasks by the user
    const user = await User.findOne({ username })
    await Task.remove({ user })
    await User.remove({ username })
    res.json('User deleted')
  }
}
