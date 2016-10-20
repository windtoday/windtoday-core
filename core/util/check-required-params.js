'use strict'

const { each, isNil } = require('lodash')

function checkNil (value, name) {
  if (!isNil(value)) return
  const message = `Need to provide '${name}' parameter.`
  throw new Error(message)
}

function checkRequiredParams (obj, requiredParams) {
  each(requiredParams, function (requiredParam) {
    const value = obj[requiredParam]
    return checkNil(value, requiredParam)
  })
}

module.exports = checkRequiredParams
