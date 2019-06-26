// https://github.com/libxmljs/libxmljs/wiki/Document

process.env.XML_DEBUG_CATALOG = process.env.NODE_ENV === 'development'

// process.env.REQUIRE_CATALOG_FILES = require.resolve(
//   '@jats4r/dtds/schema/catalog.xml'
// )

const baseUrl = __dirname + '/../node_modules/@jats4r/dtds/schema/'

process.env.XML_CATALOG_FILES = baseUrl + '/catalog.xml'

process.env.XMLLINT_INDENT = 2

module.exports = { baseUrl }
