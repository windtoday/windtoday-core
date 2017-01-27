'use strict'

const {includes} = require('lodash')

const VALID = [
  'particular',
  'store'
]

module.exports = (value) => includes(VALID, value)
