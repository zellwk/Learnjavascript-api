const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

// ======================================
// # Middlewares
// ======================================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// ======================================
// # Routes
// ======================================
const Task = require('./models/Task')

app.get('/todos', (req, res) => {
  Task.find({}, (err, docs) => {
    if (err) return res.status(500).json(err)

    const returned = docs.map(doc => ({
      id: doc._id,
      task: doc.task,
      done: doc.done
    }))

    return res.json(returned)
  })
})

app.post('/todos', (req, res) => {
  const { task, done } = req.body

  const newTask = new Task({ task, done })
  newTask.save((err, resp) => {
    if (err) return res.status(400).json(err)

    return res.json({
      id: resp._id,
      task: resp.task,
      done: resp.done
    })
  })
})

app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const { task, done } = req.body

  Task.findOneAndUpdate({ _id: id }, { task, done }, { rawResult: true }, (err, doc) => {
    if (err) return res.status(400).json(err)

    const toReturn = {
      id: doc.value._id,
      task: doc.value.task,
      done: doc.value.done
    }

    res.json(toReturn)
  })
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params

  Task.findOneAndDelete({ _id: id }, (err, doc) => {
    if (err) return res.json(err)
    if (!doc) return res.status(400).json({ message: 'Task not found' })
    res.json({ message: 'Task deleted' })
  })
})

module.exports = app
