'use strict'

const { forEach, size } = require('lodash')

function createFlow (directories) {
  function flow (input) {
    let result

    forEach(directories, function (directory, index) {
      const dir = directory(input)

      if (size(dir.data)) {
        result = dir
        return false
      }

      // fallback
      if (index === 0) result = dir
    })

    return result
  }

  return flow
}

module.exports = createFlow
