'use strict'

const { some, get, replace, flow, toLower } = require('lodash')
const strmatch = require('str-match')()

const response = (data, output) => ({ data, output })

const BOOMS_CARBON_VENDORS = [
  {brand: 'Neilpryde', model: /x9/i},
  {brand: 'Severne', model: /enigma/i},
  {brand: 'North', model: /platinum/i},
  {brand: 'North', model: /gold/i}
]

const isVendorCarbon = (str, brandVendor) =>
  some(BOOMS_CARBON_VENDORS, ({brand, model}) => (
    brandVendor === brand && model.test(str)
))

const REGEX_BOOM_TYPE_CARBON = /carbono?/i
const REGEX_BOOM_TYPE_ALUMINIUM = /aluminium|aluminio|alu/i

const normalizeTypeCarbon = flow([
  str => replace(str, REGEX_BOOM_TYPE_CARBON, 'carbon'),
  toLower
])

function typeCarbon (str, brand) {
  if (isVendorCarbon(str, brand)) return response('carbon', str)
  const type = strmatch(str, REGEX_BOOM_TYPE_CARBON)
  if (!type.test) return
  return response(normalizeTypeCarbon(type.match), type.output)
}

function typeAluminium (str) {
  return response('aluminium', replace(str, REGEX_BOOM_TYPE_ALUMINIUM, ''))
}

function type (str, acc) {
  const brand = get(acc, 'data.brand')
  return typeCarbon(str, brand) || typeAluminium(str)
}

module.exports = type
