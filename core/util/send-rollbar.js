'use strict'

const CONFIG = require('config').rollbar
const Rollbar = require('rollbar')
const {get} = require('lodash')

const isProduction = process.env.NODE_ENV === 'production'
const accessToken = get(global, CONFIG)

const rollbar = new Rollbar({
  accessToken: accessToken,
  handleUncaughtExceptions: true,
  handleUnhandledRejections: true
})

function sendToRollbar (level = 'error', ...params) {
  if (isProduction) rollbar[level](params)
}

module.exports = sendToRollbar
