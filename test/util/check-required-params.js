'use strict'

const should = require('should')
const checkRequiredParams = require('../../core/util/check-required-params')

describe('core » util » check required params', function () {
  it('throw an error if a field is not present', function () {
    should(function () {
      checkRequiredParams({}, ['name'])
    }).throw("Need to provide 'name' parameter.")
  })
})
