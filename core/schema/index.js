'use strict'

const cleanTitle = require('./clean-title')
const { asyncify } = require('async')
const osom = require('osom')

const schema = osom({
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
  year: Number,
  brand: String,
  model: String
})

module.exports = asyncify(schema)
