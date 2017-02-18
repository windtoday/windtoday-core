'use strict'

const { chain, uniqBy, pick } = require('lodash')

const checkRequiredParams = require('./check-required-params')

const stringify = (val) => JSON.stringify(val)

function createUniqByProps (props) {
  function uniqByProps (collection) {
    return uniqBy(collection, elem => stringify(pick(elem, props)))
  }
  return uniqByProps
}

const REQUIRED = ['sortId', 'uniqId']

function createSnapshot (opts = {}) {
  checkRequiredParams(opts, REQUIRED)

  const {sortId, uniqId} = opts
  const uniqByProps = createUniqByProps(uniqId)

  function snapshot (collection) {
    return chain(collection)
    .thru(uniqByProps)
    .sortBy(sortId)
    .value()
  }

  return snapshot
}

module.exports = createSnapshot
