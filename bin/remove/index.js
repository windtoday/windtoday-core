#!/usr/bin/env node

'use strict'

const {parallel} = require('async')
const {get} = require('lodash')
const meow = require('meow')

const redis = require('../../core/db/state').client
const log = require('../../core/log')('delete')
const index = require('../../core/db/search')

function createParams (opts) {
  if (!opts.provider) throw TypeError('Need to provide the provider.')
  if (!opts.seller) throw TypeError('Need to provide the seller.')
  const { provider, seller, path } = opts

  let filters = `provider:${provider} AND seller:${seller}`
  if (path) filters += ` AND path:${path}`
  return {filters}
}

function getKey (opts) {
  const {provider, seller, path} = opts
  const env = get(process, 'env.NODE_ENV', 'development')
  return `${env}:${provider}:${seller}:${path}`
}

const cli = meow()
const {flags} = cli

const params = createParams(flags)
const key = getKey(flags)

const tasks = [
  function deleteKey (next) {
    return redis.del(key, next)
  },
  function deleteQuery (next) {
    return index.deleteByQuery('', params, next)
  }
]

parallel(tasks, function (err) {
  if (err) throw err
  log.info('done')
  process.exit()
})
