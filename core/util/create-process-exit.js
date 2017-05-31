'use strict'

const cleanStack = require('clean-stack')
const CONFIG = require('config').rollbar
const Rollbar = require('rollbar')
const {get} = require('lodash')

const isProduction = process.env.NODE_ENV === 'production'
const accessToken = get(global, CONFIG)
const rollbar = new Rollbar(accessToken)

function createProcessExit (log) {
  function processExit (err) {
    if (!err) return process.exit()

    const {stack, message, code = 1} = err

    log.fatal(message || err)
    if (stack) log.fatal(cleanStack(err.stack))
    if (isProduction) rollbar.error(err)

    return process.exit(code)
  }

  return processExit
}

module.exports = createProcessExit
