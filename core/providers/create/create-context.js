'use strict'

const createStats = require('./create-stats')

function createContext (opts) {
  const { log } = opts

  return {
    log,
    stats: createStats()
  }
}

module.exports = createContext
