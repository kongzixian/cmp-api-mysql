'use strict'
const formidable = require('formidable')

module.exports = {
  isObject (obj) {
    return obj !== null && typeof obj === 'object'
  },
}
