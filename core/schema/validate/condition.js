'use strict'

const {includes} = require('lodash')

const VALID = [
  'new',
  'used'
]

module.exports = (value) => includes(VALID, value)
