const mongoose = require('mongoose')
const isProduction = process.env.NODE_ENV === 'production'
// ========================
// Connection String
// ========================
const url = dbUrl()
function dbUrl () {
  if (isProduction) return process.env.DB_URL
  return 'mongodb://127.0.0.1/learnjavascript-api'
}

// ========================
// Connects to Database
// ========================
mongoose.Promise = global.Promise
mongoose.connect(url, {
  useNewUrlParser: true, // Silence deprecation warnings
  useUnifiedTopology: true, // Silence deprecation warnings
  useCreateIndex: true // Silence deprecation warnings
})

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// ========================
// Fixtures
// ========================
// const loadFixtures = require('../fixtures')
// loadFixtures()
// dropDatabase()
