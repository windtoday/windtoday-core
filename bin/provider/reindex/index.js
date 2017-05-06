'use strict'

const meow = require('meow')
const {series} = require('async')
const {assign} = require('lodash')

const createProcessExit = require('../../../core/util/create-process-exit')
const createBootstrap = require('../../bootstrap/create-bootstrap')
const createRemove = require('../../remove/create-remove')

const cli = meow()
const {flags} = cli

const remove = createRemove(flags)
const bootstrapOpts = assign({checkHosts: false, isForced: true}, flags)
const bootstrap = createBootstrap(bootstrapOpts)

const tasks = [
  remove,
  bootstrap
]

const {log} = bootstrap
const processExit = createProcessExit(log)

series(tasks, processExit)
