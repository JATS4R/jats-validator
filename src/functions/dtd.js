const libxml = require('./libxml')

const baseUrl = __dirname + '/../node_modules/@jats4r/dtds/schema/'

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
    baseUrl,
  })

  res.json({
    errors: errors.map(selectOutput),
  })
}
