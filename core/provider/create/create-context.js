'use strict'

function createContext (opts) {
  const { log, isForced } = opts
  return { log, isForced }
}

module.exports = createContext
