const multer = require('multer')
const libxml = require('libxmljs')
const app = require('../shared/app')
const { baseUrl } = require('../shared/libxml')

const selectOutput = ({ line, column, message }) => ({
  line,
  column,
  message,
})

app.post('*', multer().single('xml'), (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

  const { errors } = libxml.parseXmlString(data, {
    dtdload: true,
    dtdvalid: true,
    nonet: true,
    recover: true,
    baseUrl,
  })

  res.json({
    errors: errors.map(selectOutput),
  })
})

module.exports = app
