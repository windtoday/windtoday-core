'use strict'

const { map, chain, size, mapValues, concat, uniqBy, pick } = require('lodash')
const { waterfall, parallel } = require('async')

const search = require('./search')
const state = require('./state')

const CONST = {
  SORT_ID: 'title',
  DIFF_IDS: ['price', 'title', 'link']
}

const uniqByProps = (collection, props) => {
  const stringify = (val) => JSON.stringify(val)
  return uniqBy(collection, elem => stringify(pick(elem, props)))
}

const getSnapshot = (collection) => {
  const uniqCollection = uniqByProps(collection, CONST.DIFF_IDS)
  return chain(uniqCollection)
  .sortBy(CONST.SORT_ID)
  .value()
}

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      const ids = CONST.DIFF_IDS
      const value = getSnapshot(docs)
      return state.compare({key, value, ids}, next)
    },
    function update (diff, next) {
      const stats = mapValues(diff, size)
      const {added, common, removed} = diff
      const newDocs = concat(common, added)
      const newState = getSnapshot(newDocs)

      const subTasks = [
        (done) => search.addObjects(added, done),
        (done) => search.deleteObjects(map(removed, CONST.UNIQUE_ID), done)
      ]
      return parallel(subTasks, (err) => next(err, newState, added, stats))
    },
    function saveState (value, added, stats, next) {
      return state.set({key, value}, (err) => next(err, added, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
