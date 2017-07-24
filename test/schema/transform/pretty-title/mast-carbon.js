'use strict'

const should = require('should')
const prettyMastCarbon = require('../../../../core/schema/transform/pretty-title/mast-carbon')

describe('schema » transform » pretty title » mast type', function () {
  const expected = 'C75'
  ;[
    '75c',
    '75C',
    'c75',
    'C75',
    'X75',
    'C75%',
    '75%'
  ].forEach(carbon => {
    it(carbon, function () {
      const title = `Mástil Neilpryde 4m ${carbon} SDM`
      const item = { title, 'mast carbon': 75 }
      const output = prettyMastCarbon(item)
      should(output).be.equal(`Mástil Neilpryde 4m ${expected} SDM`)
    })
  })
})
