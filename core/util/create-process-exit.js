'use strict'

const cleanStack = require('clean-stack')

function createProcessExit (log) {
  function processExit (err) {
    if (!err) {
      log.info('finished')
      return process.exit()
    }

    const { stack, message, code = 1 } = err
    log.fatal(`fatal error: ${message || err}`)
    if (stack) log.fatal(cleanStack(stack))

    return process.exit(code)
  }

  return processExit
}

module.exports = createProcessExit
