'use strict'

const CONFIG = require('config').rollbar
const Rollbar = require('rollbar')
const {get} = require('lodash')

const {NODE_ENV = 'development'} = process.env
const isProduction = NODE_ENV === 'production'
const accessToken = get(global, CONFIG)

const rollbar = new Rollbar({
  accessToken: accessToken,
  environment: NODE_ENV,
  handleUncaughtExceptions: true,
  handleUnhandledRejections: true
})

function sendToRollbar (level = 'error', ...params) {
  if (isProduction) rollbar[level](...params)
}

module.exports = sendToRollbar
