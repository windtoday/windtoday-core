'use strict'

const condenseWhitespace = require('condense-whitespace')
const {replace} = require('lodash')

const createSailSize = require('../../../identify/sail/size').create

const REPLACEMENT = '{{SIZE}}'
const REPLACEMENT_REGEX = /\{\{SIZE\}\} ?m/

const sailSize = createSailSize({replacement: REPLACEMENT})
const normalizeOutput = output => replace(output, REPLACEMENT_REGEX, REPLACEMENT)

const hasSailSize = item => !!item['sail size']

function prettySailSize (item) {
  const {title} = item
  if (!hasSailSize(item)) return title

  let {data, output} = sailSize(title)
  const normalizedOutput = normalizeOutput(output)
  const replacerOutput = replace(normalizedOutput, REPLACEMENT, `${data}m `)
  return condenseWhitespace(replacerOutput)
}

module.exports = prettySailSize
