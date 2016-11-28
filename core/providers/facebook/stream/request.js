'use strict'

const get = require('simple-get')
const { map, partial } = require('lodash')
const CONFIG = require('config').facebook

const appId = process.env[CONFIG.app_id]
const appSecret = process.env[CONFIG.app_secret]
const { limit, groups_ids } = CONFIG

const batch = map(groups_ids, function (id) {
  return {
    method: 'GET',
    relative_url: `/${id}/feed?limit=${limit}`
  }
})

const opts = {
  method: 'POST',
  url: 'https://graph.facebook.com',
  form: {
    access_token: `${appId}|${appSecret}`,
    batch: JSON.stringify(batch)
  },
  json: true
}

module.exports = partial(get.concat, opts)
