'use strict'

const create = require('./create')

module.exports = {
  sails: create(require('windtoday-sails')),
  boards: create(require('windtoday-boards'))
}
