// Sets all changes required for Mongoose so we don't have to set them per file
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Prevent deprecation warnings when using Mongoose indexes (like unique)
mongoose.set('useCreateIndex', true)

module.exports = mongoose
