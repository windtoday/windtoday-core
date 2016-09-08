'use strict'

const create = require('./create')

module.exports = {
  sails: require('windtoday-sails'),
  boards: create(require('windtoday-boards'))
}
