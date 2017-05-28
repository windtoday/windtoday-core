'use strict'

const {replace} = require('lodash')

const createSailSize = require('../../../identify/sail/size').create

const REPLACEMENT = '{{SIZE}}'
const REPLACEMENT_REGEX = /\{\{SIZE\}\} ?m/

const sailSize = createSailSize({replacement: REPLACEMENT})
const normalizeOutput = output => replace(output, REPLACEMENT_REGEX, REPLACEMENT)

function prettySailSize (str) {
  const {data, output} = sailSize(str)
  if (!data) return

  const normalizedOutput = normalizeOutput(output)
  return replace(normalizedOutput, REPLACEMENT, `${data}m`)
}

module.exports = prettySailSize
