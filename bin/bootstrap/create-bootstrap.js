'use strict'

const createWorker = require('../../core/worker')
const {assign} = require('lodash')

function createBootstrap (flags) {
  function bootstrap (cb) {
    const opts = assign(flags, {share: false})
    const worker = createWorker(opts)
    return worker(cb)
  }

  return bootstrap
}

module.exports = createBootstrap
