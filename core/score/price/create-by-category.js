'use strict'

const createScore = require('./create')

const test = item => true
const getKey = (item, serializeProp, logMissing) => ''

module.exports = ({ log, propName, data }) => createScore({ data, test, getKey, propName, log })
