'use strict'

const { get } = require('lodash')

function factory (log) {
  function processExit (err) {
    if (!err) return process.exit()

    const message = get(err, 'message', err)
    const code = get(err, code, 1)

    log.error({reason: message})
    return process.exit(code)
  }

  return processExit
}

module.exports = factory
