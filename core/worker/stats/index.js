'use strict'

const MongoClient = require('mongodb').MongoClient
const CONFIG = require('CONFIG').stats
const {assign, waterfall} = require('async')
const {get} = require('lodash')

const getStats = require('../../stats')

const password = get(global, CONFIG.password)
const database = get(global, CONFIG.database)

const uri = `mongodb://root:${password}@cluster0-shard-00-00-a9swv.mongodb.net:27017,cluster0-shard-00-01-a9swv.mongodb.net:27017,cluster0-shard-00-02-a9swv.mongodb.net:27017/${database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`

module.exports = ({ log, data }) => {
  return cb => waterfall([
    next => MongoClient.connect(uri, next),
    (db, next) => {
      const stats = getStats(data)
      const collection = db.collection('stats')
      const doc = assign({
        timestamp: Date.now()
      }, stats)
      collection.insertOne(doc, (err, result) => cb(err, db, result))
    }
  ], (err, db, result) => {
    db.close()
    return cb(err)
  })
}
