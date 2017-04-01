'use strict'

const {forEach} = require('lodash')

const categorySingular = require('../category').singular
const createLogger = require('../log')

const identify = {
  autodetection: require('./autodetection'),
  board: require('./board'),
  boom: require('./boom'),
  fin: require('./fin'),
  mast: require('./mast'),
  price: require('./price'),
  sail: require('./sail'),
  year: require('./year'),
  other: require('./other')
}

function createIdentify (opts) {
  const { path, log } = opts
  const logKeyword = log.keyword
  const identifyLog = createLogger(`${logKeyword}_unidentify`)

  switch (path) {
    case 'sails':
    case 'boards':
    case 'masts':
    case 'booms':
    case 'fins':
      const category = categorySingular(path)
      return identify[category](identifyLog)
    default:
      return identify.autodetection(identifyLog)
  }
}

forEach(identify, (value, key) => {
  createIdentify[key] = identify[key]
})

module.exports = createIdentify
