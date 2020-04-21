import { Schematron } from './lib/Schematron'

const multer = require('multer')
const app = require('../shared/app')

const baseUrl = __dirname + '/../node_modules/@jats4r/schematrons/schematrons/'

const resourceDir = baseUrl + '/1.0'

app.post('*', multer().single('xml'), (req, res, next) => {
  const data = req.file.buffer.toString()

  const schematron = new Schematron(`${resourceDir}/jats4r.sch`)

  try {
    res.json({
      results: schematron.validate(data),
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app
