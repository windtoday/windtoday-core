'use strict'

const strmatch = require('str-match')
const {replace} = require('lodash')

function response (data, output) {
  return { data, output }
}

const REGEX_BOOM_TYPE_CARBON = /carbon/i
const REGEX_BOOM_TYPE_ALUMINIUM = /aluminium|aluminio|alu/i

function typeCarbon (str) {
  const type = strmatch(str, REGEX_BOOM_TYPE_CARBON)
  if (!type.test) return
  return response(type.match, type.output)
}

function typeAluminium (str) {
  return response('aluminium', replace(str, REGEX_BOOM_TYPE_ALUMINIUM, ''))
}

function type (str) {
  return typeCarbon(str) || typeAluminium(str)
}

module.exports = type
