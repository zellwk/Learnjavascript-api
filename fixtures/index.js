const fs = require('fs')
const util = require('util')
const readDir = util.promisify(fs.readdir).bind(fs)
const path = require('path')
const mongoose = require('mongoose')

// Load fixtures of all models
async function loadFixtures () {
  const dir = await readDir(__dirname)
  const toLoad = dir.filter(f => f.includes('.fixtures.js'))

  const models = Object.keys(mongoose.models)
  for (let modelName of models) {
    const model = mongoose.models[modelName]

    const file = toLoad.find(f => {
      return f.includes(modelName.toLowerCase())
    })

    if (!file) continue

    const contents = require(path.join(__dirname, file))
    await model.create(contents)
  }
}

module.exports = loadFixtures
