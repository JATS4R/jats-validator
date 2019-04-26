const cors = require('cors')
const express = require('express')
const multer = require('multer')
const validator = require('schematron-runner')
const libxml = require('libxmljs2')

const app = express()
app.use(cors())

const upload = multer()

app.get('*', (req, res) => {
  res.send(`<!doctype html>
<meta charset="utf-8">
<title>JATS4R Validator</title>

<form method="post" enctype="multipart/form-data">
  <label>XML: <input type="file" name="xml" accept="application/xml"></label>
  <button type="submit" formaction="/format">Format</button>
  <button type="submit" formaction="/dtd">Validate with DTD</button>
  <button type="submit" formaction="/schematron">Validate with Schematron</button>
</form>`)
})

app.post('/format', upload.single('xml'), (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

  process.env.XML_DEBUG_CATALOG = process.env.NODE_ENV === 'development'
  process.env.XML_CATALOG_FILES = require.resolve(
    '@jats4r/dtds/schema/catalog.xml'
  )
  process.env.XMLLINT_INDENT = 2

  // https://github.com/libxmljs/libxmljs/wiki/Document

  const doc = libxml.parseXmlString(data, {
    // dtdattr: true,
    dtdload: true,
    dtdvalid: true,
    loaddtd: true,
    noblanks: true,
    nocdata: true,
    noent: true,
    nonet: true,
    nsclean: true,
  })

  res.set('Content-Type', 'application/xml').send(doc.toString())
})

app.post('/dtd', upload.single('xml'), (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

  process.env.XML_DEBUG_CATALOG = process.env.NODE_ENV === 'development'
  process.env.XML_CATALOG_FILES = require.resolve(
    '@jats4r/dtds/schema/catalog.xml'
  )

  // https://github.com/libxmljs/libxmljs/wiki/Document

  const { errors } = libxml.parseXmlString(data, {
    dtdload: true,
    dtdvalid: true,
    loaddtd: true,
    noblanks: true,
    noent: true,
    nonet: true,
    // dtdattr: true,
    // nsclean: true,
  })

  const selectOutput = ({ line, column, message }) => ({
    line,
    column,
    message,
  })

  res.json({
    errors: errors.map(selectOutput),
  })
})

app.post('/schematron', upload.single('xml'), (req, res, next) => {
  const data = req.body.xml || req.file.buffer.toString()

  const schematron = require.resolve(
    '@jats4r/schematrons/schematrons/1.0/jats4r.sch'
  )

  validator
    .validate(data, schematron)
    .then(results => {
      res.json({ results })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = app
