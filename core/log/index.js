'use strict'

const { isString, assign } = require('lodash')
const createLogger = require('acho')

const isTest = process.env.NODE_ENV === 'test'

function log (opts) {
  if (isString(opts)) opts = { keyword: opts }

  const loggerOpts = assign({}, opts, {
    level: isTest && 'muted'
  })

  return createLogger(loggerOpts)
}

module.exports = log
