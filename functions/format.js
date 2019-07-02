const multer = require('multer')
const libxml = require('libxmljs')
const app = require('../shared/app')
const { baseUrl } = require('../shared/libxml')
const { execSync } = require('child_process')

app.post('*', multer().single('xml'), (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

  try {
    const doc = libxml.parseXmlString(data, {
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
