'use strict'

const take = require('lodash/take')

const DEFAULTS = {
  separator: ' ',
  length: 8
}

function truncate (str, opts) {
  const { separator, length } = opts
  str = str.split(separator)
  return take(str, length).join(separator)
}

function gerFirstBreakLine (str) {
  const split = str.split('\n')
  if (split.length > 1) return split[0]
  return null
}

function titly (str, opts) {
  opts = Object.assign({}, DEFAULTS, opts)

  let title = gerFirstBreakLine(str)
  if (title) return truncate(title, opts)

  const { separator, length } = opts
  str = str.split(separator)
  title = []

  let parsing = true
  let index = 0
  let word

  while (parsing) {
    word = str[index]
    title.push(word)
    if (++index >= length) parsing = false
  }

  return title.join(separator)
}

module.exports = titly
