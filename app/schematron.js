const validator = require('schematron-runner')

const schematron = require.resolve(
  '@jats4r/schematrons/schematrons/1.0/jats4r.sch'
)

module.exports = (req, res, next) => {
  const data = req.body.xml || req.file.buffer.toString()

  validator
    .validate(data, schematron)
    .then(results => {
      res.json({ results })
    })
    .catch(error => {
      next(error)
    })
}
