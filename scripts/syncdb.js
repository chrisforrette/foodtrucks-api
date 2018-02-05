#!/usr/bin/env node

/**
 * Script to force (overwrite!) write database tables
 */
const sequelize = require('../app/clients/sequelize')
/* eslint-disable no-unused-vars */
const models = require('../app/models')
/* eslint-enable no-unused-vars */

sequelize
  .sync({ force: true })
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
