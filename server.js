const app = require('./')

const port = process.env.PORT || 8081
const hostname = process.env.HOSTNAME || 'localhost'

const server = app.listen(port, hostname, () => {
  const { address, port } = server.address()
  console.log(`Listening at http://${address}:${port}/`)
})
