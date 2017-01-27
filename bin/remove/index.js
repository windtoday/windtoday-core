#!/usr/bin/env node

'use strict'

const meow = require('meow')
const createRemove = require('./create-remove')
const createProcessExit = require('../../core/util/create-process-exit')

const cli = meow()
const {flags} = cli

const remove = createRemove(flags)
const {log} = remove
const processExit = createProcessExit(log)

remove(processExit)
