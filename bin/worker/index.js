#!/usr/bin/env node

'use strict'

const createWorker = require('../../core/worker')
const meow = require('meow')
const path = require('path')
const fs = require('fs')

const cli = meow({
  pkg: '../../package.json',
  help: fs.readFileSync(path.join(__dirname, '/help.txt'), 'utf8')
}, {
  alias: {
    s: 'source',
    t: 'type',
    c: 'category',
    p: 'provider'
  }
})

createWorker(cli.flags)
