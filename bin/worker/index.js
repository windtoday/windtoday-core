'use strict'

const {assign} = require('lodash')
const meow = require('meow')

const createProcessExit = require('../../core/util/create-process-exit')
const createWorker = require('../../core/worker')

const cli = meow()
const flags = assign(cli.flags)

const worker = createWorker(flags)
const {log} = worker

const processExit = createProcessExit(log)

worker(processExit)
