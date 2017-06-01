'use strict'

const startOfDay = require('date-fns/start_of_day')
const {assign, isFinite} = require('lodash')
const {asyncify} = require('async')
const osom = require('osom')

const getReferralLink = require('./get-referral-link')
const getCondition = require('./get-condition')

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
    validate: isValidTitle
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
  timestamp: {
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

  'board size': {
    type: Number,
    validate: isFinite
  },

  'boom size': String,
  'boom type': String,

  'fin size': Number,
  'fin type': String,

  'mast carbon': Number,
  'mast type': String
})

const validateAsync = asyncify(validate)

function validator (schema, cb) {
  const now = Date.now()

  const doc = assign({}, schema, {
    condition: getCondition(schema),
    link: getReferralLink(schema),
    timestamp: now,
    updatedAt: startOfDay(now).getTime()
  })

  const schemaSerialized = serializer(doc)

  validateAsync(schemaSerialized, function (err, doc) {
    if (err) return cb(err, doc)

    const title = prettyTitle(doc)
    return cb(null, assign({}, doc, {title}))
  })
}

module.exports = validator
