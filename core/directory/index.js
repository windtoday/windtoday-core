'use strict'

const sails = require('windtoday-sails')
const create = require('./create')

module.exports = {
  sails: create(sails)
}
