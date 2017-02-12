'use strict'

const {asyncify} = require('async')
const {assign, includes, toLower} = require('lodash')
const osom = require('osom')

const prettyTitle = require('./transform/pretty-title')
const validCondition = require('./validate/condition')
const validSailSize = require('./validate/sail-size')
const validPrice = require('./validate/price')
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
    type: String
  },
  condition: {
    required: true,
    type: String,
    validate: validCondition
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
    validate: validPrice
  },

  year: Number,

  'mast size': Number,

  'sail size': {
    type: Number,
    validate: validSailSize
  },

  'board size': Number,

  'boom size': String,
  'boom type': String,

  'fin size': Number,
  'fin type': String,

  'mast carbon': Number,
  'mast type': String
})

function getCondition (item) {
  const condition = toLower(item.condition)
  if (validCondition(condition)) return condition

  const seller = toLower(item.seller)
  const isParticularSeller = includes(['particular', 'used'], seller)
  return isParticularSeller ? 'used' : 'new'
}

const validateAsync = asyncify(validate)

function validator (schema, cb) {
  const doc = assign({}, schema, {
    condition: getCondition(schema),
    updatedAt: Date.now()
  })
  const docSerialized = serializer(doc)
  return validateAsync(docSerialized, cb)
}

module.exports = validator
