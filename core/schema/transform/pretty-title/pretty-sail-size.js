'use strict'

const {replace, includes} = require('lodash')

const createSailSize = require('../../../identify/sail/size').create

const KEYWORD = '{{SIZE}}'
const sailSize = createSailSize({replacement: KEYWORD})

const getReplacer = (output, data) => {
  if (includes(output, '{{SIZE}}m')) return {output, data}
  if (includes(output, '{{SIZE}} m')) {
    return {
      output: replace(output, '{{SIZE}} m', '{{SIZE}}m'),
      data
    }
  }

  return {
    output,
    data: `${data}m`
  }
}

function prettySailSize (str) {
  const {data: originalData, output: originalOutput} = sailSize(str)
  const {data, output} = getReplacer(originalOutput, originalData)
  return replace(output, KEYWORD, data)
}

module.exports = prettySailSize
