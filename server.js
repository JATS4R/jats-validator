const app = require('./')

const server = app.listen(process.env.PORT || 8081, () => {
  const { port } = server.address()
  console.log(`Listening on port ${port}`)
})
