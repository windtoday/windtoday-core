'use strict'

const {isArray, isObject, isString, reduce} = require('lodash')
const urlRegex = require('url-regex')
const titleize = require('titleize')

const isUrl = (str) => urlRegex().test(str)
const isTitle = (str) => isString(str) && !isUrl(str)

function capitalize (value) {
  return isTitle(value) ? titleize(value) : value
}

function capitalizeValue (value) {
  return !isArray(value) ? capitalize(value) : value.map(capitalize)
}

function capitalizeCollection (collection) {
  if (isArray(collection)) return capitalizeValue(collection)

  return reduce(collection, function (acc, value, key) {
    acc[key] = capitalizeValue(value)
    return acc
  }, {})
}

function capitalizeTitle (value) {
  const fn = !isObject(value) ? capitalizeValue : capitalizeCollection
  return fn(value)
}

module.exports = capitalizeTitle
