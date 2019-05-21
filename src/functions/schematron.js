const validator = require('schematron-runner')

const resourceDir =
  __dirname + '/../node_modules/@jats4r/schematrons/schematrons/1.0'

module.exports = (req, res, next) => {
  const data = req.body.xml || req.file.buffer.toString()

  validator
    .validate(data, `${resourceDir}/jats4r.sch`, { resourceDir })
    .then(results => {
      res.json({ results })
    })
    .catch(error => {
      next(error)
    })
}
