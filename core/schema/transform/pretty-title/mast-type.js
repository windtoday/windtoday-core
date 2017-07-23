'use strict'

const { toUpper, replace } = require('lodash')

const identifyType = require('../../../identify/mast/type')
const { regex } = identifyType

module.exports = ({title, 'mast type': mastType}) => {
  if (!mastType) return title
  return replace(title, regex, toUpper(mastType))
}
