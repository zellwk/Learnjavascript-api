const Rsync = require('rsync')
const fs = require('fs')
const dotenv = require('dotenv')

const updateEnv = pathToConfig => {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig))
  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

updateEnv('./variables.env')

const rsync = new Rsync()
  .shell('ssh')
  .set('stats')
  .flags('avz')
  .source('./variables.env')
  .destination(`${process.env.SSH_DEST}`)

rsync.output(
  function (data) {
    // do things like parse progress
    const string = Buffer.from(data).toString()
    console.log(string)
  }, function (data) {
    // do things like parse error output
    console.log(data)
  }
)

// Execute the command
rsync.execute(function (error, code, cmd) {
  if (error) console.error(error)
  console.log(cmd)
})
