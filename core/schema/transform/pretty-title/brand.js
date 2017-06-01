'use strict'

const {sails} = require('../../../directory')
const {replace} = require('lodash')

const REPLACEMENT = '{{BRAND}}'

function prettyBrand (item) {
  const {title, brand} = item
  if (!brand) return title

  const {output} = sails(title, {
    findModel: false,
    strmatchOpts: {
      replacement: REPLACEMENT
    }
  })

  return replace(output, REPLACEMENT, brand)
}

module.exports = prettyBrand
