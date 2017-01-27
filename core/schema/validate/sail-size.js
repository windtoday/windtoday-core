'use strict'

const {inRange} = require('lodash')

const MAX = 3
const MIN = 12

module.exports = (value) => inRange(value, MIN, MAX)
