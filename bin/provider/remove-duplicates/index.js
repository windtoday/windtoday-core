'use strict'

const { reduce, chain, size } = require('lodash')
const { waterfall } = require('async')

const log = require('../../../core/log')('remove-duplicates')
const index = require('../../../core/db/search')

const CONST = {
  QUERY: '',
  DIFF_ID: 'title'
}

waterfall([find, diff, remove], finish)

function find (cb) {
  return index.search(CONST.QUERY, cb)
}

function diff (docs, cb) {
  const repeatedDocs = chain(docs)
    .uniqBy(CONST.DIFF_ID)
    .differenceBy(docs, CONST.DIFF_ID)
    .value()

  return cb(null, docs, repeatedDocs)
}

function remove (docs, repeatedDocs, cb) {
  const affectedDocs = size(repeatedDocs)
  if (!size(affectedDocs)) return cb(null, affectedDocs)

  const ids = reduce(
    docs,
    (acc, item) => {
      const { objectID, title, seller, provider, path } = item
      log.debug('deleteObject', { title, seller, provider, path })
      return objectID
    },
    []
  )

  return index.deleteObjects(ids, err => cb(err, affectedDocs))
}

function finish (err, size) {
  if (err) throw err
  log.info('done', { size })
  process.exit(0)
}
