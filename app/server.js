const app = require('./')

const server = app.listen(process.env.PORT || 8081, '0.0.0.0', () => {
  const { address, port } = server.address()
  console.log(`Listening on http://${address}:${port}`)
})
