const multer = require('multer')
const libxml = require('libxmljs2')
const app = require('../shared/app')
const { baseUrl } = require('../shared/libxml')

app.post('*', multer().single('xml'), (req, res) => {
  const data = req.file.buffer.toString()

  try {
    const doc = libxml.parseXml(data, {
      // dtdattr: true,
      dtdload: true,
      dtdvalid: true,
      noblanks: true,
      nocdata: true,
      noent: true,
      nonet: true,
      nsclean: true,
      baseUrl,
    })

    res.set('Content-Type', 'application/xml').send(doc.toString())
  } catch (e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

module.exports = app
