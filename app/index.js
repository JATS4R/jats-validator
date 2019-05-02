const cors = require('cors')
const express = require('express')
const upload = require('multer')()
const dtd = require('./dtd')
const index = require('./form')
const format = require('./format')
const schematron = require('./schematron')

process.env.XML_DEBUG_CATALOG = process.env.NODE_ENV === 'development'

process.env.XML_CATALOG_FILES = require.resolve(
  '@jats4r/dtds/schema/catalog.xml'
)

process.env.XMLLINT_INDENT = 2

module.exports = express()
  .use(cors())
  .set('json spaces', 2)
  .get('/', index)
  .post('/format', upload.single('xml'), format)
  .post('/dtd', upload.single('xml'), dtd)
  .post('/schematron', upload.single('xml'), schematron)
