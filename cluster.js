const cluster = require('cluster')
const control = require('strong-cluster-control')

const config = require('./app/config')
const logger = require('./app/logger')

control
  .start({ size: config.get('concurrency') })
  .on('start', () => logger.info(`Cluster starting`))
  .on('stop', () => logger.info(`Cluster stopping`))
  .on('setSize', (size) => logger.info(`Cluster size set to ${size} workers`))
  .on('restart', () => logger.info(`Cluster restarted`))
  .on('resize', (size) => logger.info(`Cluster resized to ${size} workers`))
  .on('error', (error) => logger.error(`Cluster error: `, error))
  .on('startWorker', (worker) => logger.info(`Cluster worker ${worker.id} started`))
  .on('startRestart', (workers) => logger.info(`Cluster restarting workers ${workers}`))

if (cluster.isWorker) {
  const server = require('./app/server')
  server.start()
}
