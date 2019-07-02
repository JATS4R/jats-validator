const cors = require('cors')
const express = require('express')

module.exports = express()
  .use(cors())
  .set('json spaces', 2)
