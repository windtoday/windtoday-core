'use strict'

const {assign} = require('lodash')
const meow = require('meow')

const createLoggerKeyword = require('../../core/util/create-logger-keyword')
const createProcessExit = require('../../core/util/create-process-exit')
const createBootsrap = require('./create-bootstrap')
const createLogger = require('../../core/log')

const cli = meow()
const {flags} = cli

const log = createLogger({
  keyword: createLoggerKeyword(flags),
  diff: true
})

const bootstrap = createBootsrap(assign({log}, flags))
const processExit = createProcessExit(log)

bootstrap(processExit)
