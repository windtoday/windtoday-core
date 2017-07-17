'use strict'

const { assign } = require('lodash')

const createLoggerKeyword = require('../../../core/util/create-logger-keyword')
const createProviderWorker = require('../../../core/worker/provider')
const createLogger = require('../../../core/log')

function createBootstrap (flags) {
  const log = createLogger({
    keyword: createLoggerKeyword(flags),
    diff: true
  })

  function bootstrap (cb) {
    const opts = assign({ share: false, log }, flags)
    const providerWorker = createProviderWorker(opts)
    return providerWorker(cb)
  }

  bootstrap.log = log

  return bootstrap
}

module.exports = createBootstrap
