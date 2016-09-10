'use strict'

const { each, isNil } = require('lodash')

function checkNil (value) {
  if (!isNil(value)) return
  const message = `Need to provide '${value}' parameter.`
  throw new Error(message)
}

function checkRequiredParams (obj, requiredParams) {
  each(requiredParams, function (requireParam) {
    const value = obj[requireParam]
    return checkNil(value)
  })
}

module.exports = checkRequiredParams
