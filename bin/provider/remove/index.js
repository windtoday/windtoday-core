'use strict'

const meow = require('meow')
const createRemove = require('./create-remove')
const createProcessExit = require('../../../core/util/create-process-exit')

const { flags } = meow()
const remove = createRemove(flags)
const { log } = remove
const processExit = createProcessExit(log)

remove(processExit)
