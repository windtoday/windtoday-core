'use strict'

const titleize = require('titleize')
const {isString, reduce} = require('lodash')

function titleizeProps (obj) {
  return reduce(obj, function (acc, key, value) {
    acc[key] = !isString(value) ? value : titleize(value)
    return acc
  }, {})
}

module.exports = titleizeProps
