'use strict'

const cleanStack = require('clean-stack')

const sendRollbar = require('../util/send-rollbar')

function createProcessExit (log) {
  function processExit (err) {
    if (!err) return process.exit()

    sendRollbar('critical', err)
    const {stack, message, code = 1} = err
    log.fatal(`fatal error: ${message || err}`)
    if (stack) log.fatal(cleanStack(stack))

    return process.exit(code)
  }

  return processExit
}

module.exports = createProcessExit
