'use strict'

const CONFIG = require('config').algoliasearch
const algoliasearch = require('algoliasearch')
const { waterfall, parallel } = require('async')
const { concat, get, map } = require('lodash')
const state = require('./state')

const appId = get(global, CONFIG.app_id)
const apiKey = get(global, CONFIG.api_key)

const client = algoliasearch(appId, apiKey)
const index = client.initIndex(CONFIG.index)

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      return state.compare({key, value: docs, id: 'title'}, next)
    },
    function updateDocs (diff, next) {
      const subTasks = [
        (done) => index.addObjects(diff.added, done),
        (done) => index.deleteObjects(map(diff.removed, 'objectID'), done)
      ]

      const newState = concat(diff.added, diff.common)
      return parallel(subTasks, (err) => next(err, newState))
    },
    function saveState (newState, next) {
      return state.set({key, value: newState}, next)
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = {
  add,
  deleteByQuery: index.deleteByQuery.bind(index),
  addObjects: index.addObjects.bind(index)
}
