'use strict'

const {assign} = require('lodash')

const createLoggerKeyword = require('../../core/util/create-logger-keyword')
const createWorker = require('../../core/worker')
const createLogger = require('../../core/log')

function createBootstrap (flags) {
  const log = createLogger({
    keyword: createLoggerKeyword(flags),
    diff: true
  })

  function bootstrap (cb) {
    const opts = assign(flags, {log, share: false})
    const worker = createWorker(opts)
    return worker(cb)
  }

  bootstrap.log = log

  return bootstrap
}

module.exports = createBootstrap
