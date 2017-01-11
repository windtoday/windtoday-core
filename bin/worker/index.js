#!/usr/bin/env node

'use strict'

const createWorker = require('../../core/worker')
const meow = require('meow')

const cli = meow()
createWorker(cli.flags)
