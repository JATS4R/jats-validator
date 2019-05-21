const path = require('path')

module.exports = require('libxmljs')

// https://github.com/libxmljs/libxmljs/wiki/Document

process.env.XML_DEBUG_CATALOG = process.env.NODE_ENV === 'development'

// process.env.XML_CATALOG_FILES = require.resolve(
//   '@jats4r/dtds/schema/catalog.xml'
// )

process.env.XML_CATALOG_FILES =
  __dirname + '/node_modules/@jats4r/dtds/schema/catalog.xml'

process.env.XMLLINT_INDENT = 2
