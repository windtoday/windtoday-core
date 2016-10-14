'use strict'

const CONFIG = require('config')['shorte.st']
CONFIG.token = process.env[CONFIG.token]

const shortestAPI = require('shortest-api')
const shortest = shortestAPI(CONFIG)

const cleanTitle = require('./clean-title')
const { asyncify } = require('async')
const osom = require('osom')

const validate = osom({
  title: {
    required: true,
    type: String,
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
  url: {
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
  year: Number,
  brand: String,
  model: String
})

const validateAsync = asyncify(validate)

function validator (schema, cb) {
  validateAsync(schema, function (err, instance) {
    if (err) return cb(err, instance)
    shortest(instance.url, function (err, shortenURL) {
      if (err) return cb(err)
      instance.shortenURL = shortenURL
      return cb(null, instance)
    })
  })
}

module.exports = validator
