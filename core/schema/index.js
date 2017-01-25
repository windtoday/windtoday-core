'use strict'

const {asyncify} = require('async')
const {inRange} = require('lodash')
const osom = require('osom')

const prettyTitle = require('./transform/pretty-title')
const serializer = require('./serializer')

const validate = osom({
  /* common */
  title: {
    required: true,
    type: String,
    transform: [prettyTitle]
    // TODO: Add a max title size (like 140 chars)
  },
  category: {
    required: true,
    type: Array
  },
  seller: {
    required: true,
    type: String,
    transform: [
      (seller) => seller === 'particular' ? seller : 'store'
    ]
  },
  provider: {
    required: true,
    type: String
  },
  path: {
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
    type: Number
  },

  /** identify:common **/
  brand: String,
  model: String,
  price: {
    required: true,
    type: Number,
    validate: price => inRange(price, 2, 3001)
  },

  year: Number,

  'mast.size': Number,

  'sail.size': {
    type: Number,
    validate: size => inRange(size, 3, 12)
  },

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
