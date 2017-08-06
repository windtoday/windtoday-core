'use strict'

const { assign, isFinite, round } = require('lodash')
const startOfDay = require('date-fns/start_of_day')
const { waterfall, asyncify } = require('async')
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

const validator = osom({
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
    validate: isValidPrice,
    transform: [round]
  },

  year: Number,

  'sail size': {
    type: Number,
    validate: isValidSailSize
  },

  'sail type': String,

  'board size': {
    type: Number,
    validate: isFinite
  },

  'board type': String,

  'boom size': Number,
  'boom type': String,

  'fin size': {
    type: Number,
    validate: isFinite
  },

  'fin type': String,

  'mast carbon': Number,
  'mast type': String,
  'mast size': Number,

  'sail size range': String,
  'board size range': String,
  'mast size range': String,
  'mast carbon range': String,
  'boom size range': String,
  'fin size range': String
})

const titleize = asyncify(prettyTitle)
const validate = asyncify(validator)

module.exports = function (schema, cb) {
  const now = Date.now()

  const doc = assign({}, schema, {
    condition: getCondition(schema),
    link: getReferralLink(schema),
    timestamp: now,
    updatedAt: startOfDay(now).getTime()
  })

  const schemaSerialized = serializer(doc)

  const tasks = [
    function validateSchema (next) {
      return validate(schemaSerialized, next)
    },
    function prettyTitle (doc, next) {
      return titleize(doc, (err, title) => next(err, doc, title))
    },
    function assignProps (doc, title, next) {
      const prettyDoc = assign({}, doc, { title })
      return next(null, prettyDoc)
    }
  ]

  return waterfall(tasks, cb)
}
