'use strict'

const {isString, reduce} = require('lodash')
const urlRegex = require('url-regex')
const titleize = require('titleize')

const isUrl = (str) => urlRegex().test(str)
const isTitle = (str) => isString(str) && !isUrl(str)

function titleizeProps (obj) {
  return reduce(obj, function (acc, value, key) {
    acc[key] = isTitle(value) ? titleize(value) : value
    return acc
  }, {})
}

module.exports = titleizeProps
