const multer = require('multer')
const validator = require('schematron-runner')
const app = require('../shared/app')

const baseUrl = __dirname + '/../node_modules/@jats4r/schematrons/schematrons/'

const resourceDir = baseUrl + '/1.0'

app.post('*', multer().single('xml'), (req, res, next) => {
  const data = req.file.buffer.toString()

  validator
    .validate(data, `${resourceDir}/jats4r.sch`, { resourceDir })
    .then(results => {
      res.json({ results })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = app
