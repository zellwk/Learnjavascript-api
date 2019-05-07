// Overrides existing env with variables from config
// Need this because:
//  1. pm2 cluster mode stores previous env variables
//  2. dotenv doesn't overwrite env variables automatically
//     https://www.npmjs.com/package/dotenv
const updateEnv = pathToConfig => {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig))
  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const fs = require('fs')
const dotenv = require('dotenv')
const app = require('./server')
const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 5556 : 4000

updateEnv('./variables.env')
require('./server/db.js')

app.listen(port, '127.0.0.1', _ => {
  console.log('app listening on http://' + port)
})
