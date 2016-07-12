'use strict'

/* global describe */

var extract = require('../../lib/extract')

describe('extract', function () {
  require('./common')(extract)
  require('./sail')(extract)
})
