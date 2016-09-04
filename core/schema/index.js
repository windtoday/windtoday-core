'use strict'

/**
 * Schemaless validation
 */

const cleanTitle = require('./clean-title')
const { asyncify } = require('async')
const lodash = require('lodash')
const osom = require('osom')

const schema = osom({
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
    type: String,
    transform: [lodash.capitalize]
  },
  type: {
    required: true,
    type: String,
    transform: [lodash.capitalize]
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

  size: Number,
  litres: Number,
  price: Number,
  year: String,
  brand: String,
  model: String
})

module.exports = asyncify(schema)
