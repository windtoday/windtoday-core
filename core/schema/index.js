'use strict'

const cleanTitle = require('./clean-title')
const serializer = require('./serializer')
const { asyncify } = require('async')
const osom = require('osom')

const validate = osom({
  /* common */
  title: {
    required: true,
    type: String,
    transform: [cleanTitle]
    // TODO: Add a max title size (like 140 chars)
  },
  category: {
    required: true,
    type: Array
  },
  seller: {
    required: true,
    type: String
  },
  provider: {
    required: true,
    type: String
  },
  path: {
    type: String
  },
  // TODO: change url → link
  url: {
    required: true,
    type: String
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    required: true,
    type: Number
  },

  /** identify:common **/
  brand: String,
  model: String,
  price: {
    required: true,
    type: Number,
    validate: price => price > 1
  },
  year: Number,

  'mast.size': Number,

  'sail.size': Number,

  'board.size': Number,

  'boom.size': String,
  'boom.type': String,

  'fin.size': Number,
  'fin.type': String,

  'mast.carbon': Number,
  'mast.type': String
})

const validateAsync = asyncify(validate)

function validator (schema, cb) {
  schema = serializer(schema)
  return validateAsync(schema, cb)
}

module.exports = validator
