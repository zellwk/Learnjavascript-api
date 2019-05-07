const loadFixtures = require('../fixtures')
const mongoose = require('mongoose')
const isProduction = process.env.NODE_ENV === 'production'
const url = isProduction
  ? `mongodb://${process.env.DB_URL}`
  : `mongodb://127.0.0.1/learnjavascript-api`

mongoose.Promise = global.Promise
// Prevent deprecation warning
// collection.ensureIndex is deprecated. Use createIndexes instead."
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true })

// Connect to DB
const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// loadFixtures()
// dropDatabase()
