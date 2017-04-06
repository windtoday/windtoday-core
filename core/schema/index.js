'use strict'

const {asyncify} = require('async')
const {assign} = require('lodash')
const osom = require('osom')

const getCondition = require('./get-condition')
const getReferralLink = require('./get-referral-link')

const prettyTitle = require('./transform/pretty-title')
const isValidCondition = require('./validate/condition')
const isValidSailSize = require('./validate/sail-size')
const isValidTitle = require('./validate/title')
const isValidPrice = require('./validate/price')
const serializer = require('./serializer')
const isUrl = require('../util/is-url')

const validate = osom({
  /* common */
  title: {
    required: true,
    type: String,
    validate: isValidTitle,
    transform: [prettyTitle]
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
    validate: isValidCondition
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
    type: String,
    validate: isUrl
  },
  image: {
    type: String,
    validate: isUrl
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  },
  isForced: {
    type: Boolean,
    default: false
  },

  /** identify:common **/
  brand: String,
  model: String,
  price: {
    required: true,
    type: Number,
    validate: isValidPrice
  },

  year: Number,

  'mast size': Number,

  'sail size': {
    type: Number,
    validate: isValidSailSize
  },

  'board size': Number,

  'boom size': String,
  'boom type': String,

  'fin size': Number,
  'fin type': String,

  'mast carbon': Number,
  'mast type': String
})

const validateAsync = asyncify(validate)

function validator (item, cb) {
  const doc = assign({}, item, {
    condition: getCondition(item),
    link: getReferralLink(item),
    updatedAt: Date.now()
  })

  const docSerialized = serializer(doc)
  return validateAsync(docSerialized, cb)
}

module.exports = validator
