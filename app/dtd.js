const libxml = require('libxmljs2')

// https://github.com/libxmljs/libxmljs/wiki/Document

const selectOutput = ({ line, column, message }) => ({
  line,
  column,
  message,
})

module.exports = (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

  const { errors } = libxml.parseXmlString(data, {
    dtdload: true,
    dtdvalid: true,
    nonet: true,
    recover: true,
  })

  res.json({
    errors: errors.map(selectOutput),
  })
}
