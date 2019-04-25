const http = require('http')

const healthCheck = http.request(
  {
    host: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 8081,
    timeout: 2000,
  },
  res => {
    console.log(`HEALTHCHECK STATUS: ${res.statusCode}`)
    process.exit(res.statusCode === 200 ? 0 : 1)
  }
)

healthCheck.on('error', () => {
  console.error('ERROR')
  process.exit(1)
})

healthCheck.end()
