#!/usr/bin/env node

'use strict'

const {assign} = require('lodash')
const meow = require('meow')

const createWorker = require('../../core/worker')

const cli = meow()
const flags = assign(cli.flags, {share: false})

createWorker(flags)
