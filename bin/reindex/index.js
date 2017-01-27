'use strict'

const meow = require('meow')
const {series} = require('async')

const createProcessExit = require('../../core/util/create-process-exit')
const createBootstrap = require('../bootstrap/create-bootstrap')
const createRemove = require('../remove/create-remove')

const cli = meow()
const {flags} = cli

const remove = createRemove(flags)
const bootstrap = createBootstrap(flags)

const tasks = [
  remove,
  bootstrap
]

const {log} = bootstrap
const processExit = createProcessExit(log)

series(tasks, processExit)
