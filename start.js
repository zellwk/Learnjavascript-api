require('dotenv').config({ path: 'variables.env' })
const app = require('./server')
const mongoose = require('mongoose')

const isProduction = process.env.NODE_ENV === 'production'
const database = process.env.MONGO_URL
const port = isProduction ? 5556 : 4000

mongoose.Promise = global.Promise
mongoose.connect(database)

// start app
app.listen(port, '127.0.0.1', () => {
  console.log('app listening on port: ' + port)
})
