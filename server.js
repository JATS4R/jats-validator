process.env.XML_DEBUG_CATALOG = true

const app = require('./')

const port = process.env.PORT || 8081

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
