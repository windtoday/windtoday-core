'use strict'

const createStats = require('./stats')

function createContext (opts) {
  const { type, category, provider, log } = opts

  return {
    log,
    type,
    category,
    provider,
    stats: createStats()
  }
}

module.exports = createContext
