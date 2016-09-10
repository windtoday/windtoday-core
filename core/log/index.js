'use strict'

const { isString } = require('lodash')
const Acho = require('acho')

function log (opts) {
  if (isString(opts)) opts = { keyword: opts }
  return Acho(opts)
}

module.exports = log
