'use strict'

const { isString } = require('lodash')
const createLogger = require('acho')

function log (opts) {
  if (isString(opts)) opts = { keyword: opts }
  return createLogger(opts)
}

module.exports = log
