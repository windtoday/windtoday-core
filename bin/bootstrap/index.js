'use strict'

const meow = require('meow')

const createProcessExit = require('../../core/util/create-process-exit')
const createBootsrap = require('./create-bootstrap')

const cli = meow()
const {flags} = cli

const bootstrap = createBootsrap(flags)
const {log} = bootstrap

const processExit = createProcessExit(log)

bootstrap(processExit)
