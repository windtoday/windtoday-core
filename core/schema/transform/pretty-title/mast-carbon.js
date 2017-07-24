'use strict'

const condenseWhitespace = require('condense-whitespace')
const { replace } = require('lodash')

const {create: createMastCarbon} = require('../../../identify/mast/carbon')

const REPLACEMENT = '{{SIZE}}'
const REPLACEMENT_REGEX = /\{\{SIZE\}\} ?[%cx]|spx|flx/i

const getMastCarbon = createMastCarbon({ replacement: ` ${REPLACEMENT}` })
const normalizeOutput = output => replace(output, REPLACEMENT_REGEX, REPLACEMENT)

module.exports = ({ title, year, 'mast carbon': mastCarbon }) => {
  if (!mastCarbon) return title
  const { output } = getMastCarbon(title)
  const normalizedOutput = normalizeOutput(output)
  const replacerOutput = replace(normalizedOutput, REPLACEMENT, `C${mastCarbon}`)
  return condenseWhitespace(replacerOutput)
}
