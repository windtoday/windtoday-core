'use strict'

const { map, size, mapValues, concat } = require('lodash')
const { waterfall, series } = require('async')

const createSnapshot = require('../util/create-snapshot')
const search = require('./search')
const state = require('./state')

const CONST = {
  SNAPSHOT_OPTS: {
    sortId: 'title',
    uniqId: ['url', 'title']
  },
  DIFF_IDS: ['title', 'url', 'price'],
  OBJECT_ID: 'objectID'
}

function mapObjectID (objects, objectIDs) {
  return map(objects, function (item, index) {
    item[CONST.OBJECT_ID] = objectIDs[index]
    return item
  })
}

function createTransaction (objectIDs, added) {
  return [
    (done) => search.deleteObjects(objectIDs, done),
    (done) => search.addObjects(added, done)
  ]
}

const getSnapshot = createSnapshot(CONST.SNAPSHOT_OPTS)

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      const ids = CONST.DIFF_IDS
      const value = getSnapshot(docs)
      return state.compare({key, value, ids}, next)
    },
    function update (diff, next) {
      const {added, common, removed} = diff
      const objectIDs = map(removed, CONST.OBJECT_ID)
      const transaction = createTransaction(objectIDs, added)

      series(transaction, function (err, results) {
        if (err) return next(err)

        const [, content] = results
        const {objectIDs} = content
        const data = mapObjectID(added, objectIDs)
        const stats = mapValues(diff, size)
        const newDocs = concat(common, data)
        const newState = getSnapshot(newDocs)
        return next(err, newState, data, stats)
      })
    },
    function saveState (value, added, stats, next) {
      return state.set({key, value}, (err) => next(err, added, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
