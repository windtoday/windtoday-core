'use strict'

const condenseWhitespace = require('condense-whitespace')
const { flow, replace } = require('lodash')

const { create: createMastCarbon } = require('../../../identify/mast/carbon')

const REPLACEMENT = '{{SIZE}}'
const REGEX_MAST_CARBON_WORD = /carbon/i
const REGEX_MAST_CARBON_SYMBOL = /\{\{SIZE\}\}.?[%cx]|spx|flx/i

const getMastCarbon = createMastCarbon({ replacement: ` ${REPLACEMENT}` })
const normalizeOutput = flow([
  title => replace(title, REGEX_MAST_CARBON_WORD, ''),
  title => replace(title, REGEX_MAST_CARBON_SYMBOL, REPLACEMENT)
])

module.exports = ({ title, year, 'mast carbon': mastCarbon }) => {
  if (!mastCarbon) return title
  const { output } = getMastCarbon(title)
  const normalizedOutput = normalizeOutput(output)
  const replacerOutput = replace(
    normalizedOutput,
    REPLACEMENT,
    `C${mastCarbon}`
  )
  return condenseWhitespace(replacerOutput)
}
