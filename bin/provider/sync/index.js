'use strict'

const {assign} = require('lodash')
const meow = require('meow')

const createLoggerKeyword = require('../../../core/util/create-logger-keyword')
const createProcessExit = require('../../../core/util/create-process-exit')
const createProviderWorker = require('../../../core/worker/provider')
const createLogger = require('../../../core/log')

const {flags} = meow()

const log = createLogger({
  keyword: createLoggerKeyword(flags),
  diff: true
})

const providerWorker = createProviderWorker(assign({log}, flags))
const processExit = createProcessExit(log)

providerWorker(processExit)
