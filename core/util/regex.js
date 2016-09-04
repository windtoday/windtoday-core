'use strict'

const mem = require('mem')

function regex (pattern, opts = 'i') {
  return new RegExp(pattern, opts)
}

module.exports = mem(regex)
