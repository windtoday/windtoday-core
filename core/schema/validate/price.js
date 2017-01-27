'use strict'

const {inRange} = require('lodash')

const MAX = 3001
const MIN = 2

module.exports = (value) => inRange(value, MIN, MAX)
