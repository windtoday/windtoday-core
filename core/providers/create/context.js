'use strict'

const createStats = require('./stats')

function createContext (opts) {
  const { log } = opts

  return {
    log,
    stats: createStats()
  }
}

module.exports = createContext
