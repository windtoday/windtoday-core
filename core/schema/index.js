'use strict'

const CONFIG = require('config')['shorte.st']
CONFIG.token = process.env[CONFIG.token]

const shortestAPI = require('shortest-api')
const shortest = shortestAPI(CONFIG)

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
  },
  category: {
    required: true,
    type: String
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
  price: Number,
  year: Number,

  /** specific **/
  'mast.size': Number,
  'sail.size': Number,
  'board.size': Number,
  'boom.size': String,
  'fin.size': Number,

  carbon: Number,
  diameter: String,
  box: String
})

const validateAsync = asyncify(validate)

function validator (schema, cb) {
  schema = serializer(schema)

  validateAsync(schema, function (err, instance) {
    if (err) return cb(err, instance)
    shortest(instance.url, function (err, shortenUrl) {
      if (err) return cb(err)
      instance.shortenUrl = shortenUrl
      return cb(null, instance)
    })
  })
}

module.exports = validator
