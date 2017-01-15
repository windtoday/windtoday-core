#!/usr/bin/env node

'use strict'

const meow = require('meow')

const index = require('../../core/db/search')
const log = require('../../core/log')('delete')

function createParams (opts) {
  if (!opts.provider) throw TypeError('Need to provide the provider.')
  if (!opts.seller) throw TypeError('Need to provide the seller.')
  const { provider, seller, path } = opts

  let filters = `provider:${provider} AND seller:${seller}`
  if (path) filters += ` AND path:${path}`
  return {filters}
}

const cli = meow()
const params = createParams(cli.flags)

index.deleteByQuery('', params, function (err) {
  if (err) throw err
  log.info('done')
})
