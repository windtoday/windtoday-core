'use strict'

/**
 * Schemaless validation
 */

var cleanTitle = require('./clean-title')
var async = require('async')
var osom = require('osom')

var schema = osom({
  title: {
    required: true,
    type: String,
    // Not necessary because I check for that in the process!
    /*validate: {
      validator: lodash.negate(isBlacklisted),
      message: 'BACKLISTED {VALUE}'
    },*/
    transform: [cleanTitle]
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
    type: Number
  },
  updatedAt: {
    required: true,
    type: Number
  },

  size: String,
  price: String,
  year: String,
  brand: String,
  model: String
})

module.exports = async.asyncify(schema)
