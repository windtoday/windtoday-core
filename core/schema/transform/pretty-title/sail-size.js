'use strict'

const condenseWhitespace = require('condense-whitespace')
const { replace } = require('lodash')

const {create: createSailSize} = require('../../../identify/sail/size')

const REPLACEMENT = '{{SIZE}}'
const REPLACEMENT_REGEX = /\{\{SIZE\}\} ?m/

const getSailSize = createSailSize({ replacement: REPLACEMENT })
const normalizeOutput = output => replace(output, REPLACEMENT_REGEX, REPLACEMENT)

module.exports = ({ title: rawTitle, year, 'sail size': sailSize }) => {
  if (!sailSize) return rawTitle
  // We remove the year for don't interfer in the sail size detection
  const title = replace(rawTitle, year, '')

  const { output } = getSailSize(title)
  const normalizedOutput = normalizeOutput(output)
  const replacerOutput = replace(normalizedOutput, REPLACEMENT, `${sailSize}m `)
  return condenseWhitespace(replacerOutput)
}
