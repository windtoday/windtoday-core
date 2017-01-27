'use strict'

const cleanStack = require('clean-stack')

function createProcessExit (log) {
  function processExit (err) {
    if (!err) return process.exit()

    const {stack, message, code = 1} = err

    log.error(message || err)
    if (stack) log.error(cleanStack(err.stack))

    return process.exit(code)
  }

  return processExit
}

module.exports = createProcessExit
