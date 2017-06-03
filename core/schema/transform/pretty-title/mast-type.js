'use strict'

const {toUpper, replace} = require('lodash')

const identifyType = require('../../../identify/mast/type')
const {regex} = identifyType

const hasMastType = item => !!item['mast type']

function prettyMastType (item) {
  const {title} = item

  if (!hasMastType(item)) return title
  const {data} = identifyType(title)
  return replace(title, regex, toUpper(data))
}

module.exports = prettyMastType
