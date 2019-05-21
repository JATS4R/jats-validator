const libxml = require('./libxml')

module.exports = (req, res) => {
  const data = req.body.xml || req.file.buffer.toString()

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
}
