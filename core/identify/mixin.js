'use strict'

const { isEmpty } = require('lodash')
const board = require('./board')
const sail = require('./sail')

function mixin (str) {
  if (/aleta/.test(str)) return

  var extract

  extract = sail(str)
  if (!isEmpty(extract)) return extract

  return board(str)
}

module.exports = mixin
