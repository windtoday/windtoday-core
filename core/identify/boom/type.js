'use strict'

const { replace, flow, toLower } = require('lodash')
const strmatch = require('str-match')()

function response (data, output) {
  return { data, output }
}

const REGEX_BOOM_TYPE_CARBON = /carbon/i
const REGEX_BOOM_TYPE_ALUMINIUM = /aluminium|aluminio|alu/i

const normalizeTypeCarbon = flow([toLower])

function typeCarbon (str) {
  const type = strmatch(str, REGEX_BOOM_TYPE_CARBON)
  if (!type.test) return
  return response(normalizeTypeCarbon(type.match), type.output)
}

function typeAluminium (str) {
  return response('aluminium', replace(str, REGEX_BOOM_TYPE_ALUMINIUM, ''))
}

function type (str) {
  return typeCarbon(str) || typeAluminium(str)
}

module.exports = type
