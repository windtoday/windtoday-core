'use strict'

const { get } = require('lodash')

function factory (log) {
  function processExit (err) {
    if (!err) return process.exit()
    const code = get(err, 'code', 1)
    return process.exit(code)
  }

  return processExit
}

module.exports = factory
