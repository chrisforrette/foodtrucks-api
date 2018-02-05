#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const Bluebird = require('bluebird')
const csv = require('csv-parse')
const models = require('../app/models')
const logger = require('../app/logger')

const readFile = util.promisify(fs.readFile)
const csvParse = util.promisify(csv)

/**
 * Path of file to import, which was downloaded from:
 * https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat
 * @type {string}
 */
const IMPORT_FILE = './Mobile_Food_Facility_Permit.csv'

/**
 * Map a single row from the CSV for our Food Truck model
 * @param  {object} row CSV data row object
 * @return {object} A data object for inserting into the FoodTruck model
 */
const mapDataForModel = row => ({
  source_id: parseInt(row.locationid, 10),
  name: row.Applicant,
  facility_type: row.FacilityType,
  status: row.Status,
  // Replacing colons here as they seem to be used kinda like commas in the data set...
  food_items: row.FoodItems.replace(':', ','),
  days_hours: row.dayshours,
  address: row.Address,
  latitude: parseFloat(row.Latitude),
  longitude: parseFloat(row.Longitude)
})

/**
 * Open and parse the CSV file, loop through all the data and find or created it
 * in the database, skipping items that already exists by using the `locationid`
 * values
 * @param  {string} file CSV file path to import
 * @return {Promise.<array>} Resolves with an array of model instances
 */
function importData (file) {
  const stats = {
    created: 0,
    skipped: 0
  }

  return readFile(path.resolve(__dirname, file))
    .then(fileContent => csvParse(fileContent, { columns: true }))
    // Transform data for our model
    .then(rows => rows.map(mapDataForModel))
    .then(rows => Bluebird.map(
      rows,
      row => models.FoodTruck
        // Find or create each row, keeping track of how many we're
        // creating/skipping for logging at the end
        .findOrCreate({
          where: { source_id: row.source_id },
          defaults: row
        })
        .tap(([ instace, created ]) => {
          if (created) {
            stats.created++
          } else {
            stats.skipped++
          }
        })
        .catch(error => {
          logger.error('Error finding/creating row', { row, error })
          stats.skipped++
        })
    ))
    .then(() => {
      logger.info('%d New rows created', stats.created)
      logger.info('%d Existing rows skipped', stats.skipped)
    })
}

importData(IMPORT_FILE)
  .then(results => {
    logger.info('Done')
    process.exit(1)
  })
  .catch(error => {
    logger.error('An error occurred during import', { error })
    process.exit(1)
  })
