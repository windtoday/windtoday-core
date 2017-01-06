'use strict'

const CONFIG = require('config').redis
const redis = require('redis-diff')
const {get} = require('lodash')

const connection = get(global, CONFIG)

module.exports = redis(connection)
