'use strict'

const { each, isNil } = require('lodash')

function checkNil (value, message) {
  if (isNil(value)) throw new Error(message)
}

function checkRequiredParams (obj, requiredParams) {
  each(requiredParams, function (requireParam) {
    const value = obj[requireParam]
    const message = `Need to provide '${requireParam}' parameter.`
    return checkNil(value, message)
  })
}

module.exports = checkRequiredParams
