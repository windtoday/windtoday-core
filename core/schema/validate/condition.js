'use strict'

const { includes } = require('lodash')

const VALID_CONDITIONS = ['New', 'Used']

module.exports = value => includes(VALID_CONDITIONS, value)
