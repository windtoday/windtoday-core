'use strict'

const { inRange } = require('lodash')

const MAX_SAIL_SIZE = 12
const MIN_SAIL_SIZE = 3

module.exports = value => inRange(value, MIN_SAIL_SIZE, MAX_SAIL_SIZE)
