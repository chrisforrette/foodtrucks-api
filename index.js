const server = require('./app/server')
const logger = require('./app/logger')

server.start(err => {
  if (err) {
    throw err
  }
  logger.info(`Server running at: ${server.info.protocol}://${server.info.address}:${server.info.port}`)
})
