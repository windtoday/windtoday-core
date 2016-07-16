'use strict'

/**
 * Schemaless validation
 */

var blacklist = require('./blacklist')
var lodash = require('lodash')
var async = require('async')
var osom = require('osom')

var schema = osom({
  title: {
    required: true,
    type: String,
    validate: {
      validator: blacklist,
      message: 'BACKLISTED {VALUE}'
    },
    transform: [lodash.trim]
  },
  category: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  provider: {
    required: true,
    type: String
  },
  link: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: String
  },
  updatedAt: {
    required: true,
    type: String
  },

  size: String,
  price: String,
  year: String,
  brand: String,
  model: String
})

module.exports = async.asyncify(schema)
