'use strict'

const bufferapp = require('buffer-node')
const CONFIG = require('config').buffer
const {get} = require('lodash')
const accessToken = get(global, CONFIG.access_token)
const buffer = bufferapp(accessToken)

buffer.profiles.get().nodeify(function (err, response) {
  if (err) throw err
  response.forEach(function (item) {
    const {service, id} = item
    console.log({service, id})
  })
})
