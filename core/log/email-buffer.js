'use strict'

var ansiToHTML = require('ansi_up').ansi_to_html
var nodemailer = require('nodemailer')
var arrayList = require('array-list')
var CONFIG = require('config').email
var lodash = require('lodash')

function createEmailBuffer (subject) {
  var buffer = arrayList(CONFIG.buffer)
  var transporter = nodemailer.createTransport(CONFIG.transport)
  var mailDefaults = lodash.assign(lodash.pick(CONFIG, ['from', 'to']), {
    subject: subject
  })

  function send () {
    var mailOptions = lodash.assign(mailDefaults, {
      html: ansiToHTML(buffer.get().join('<br>'))
    })

    buffer.clear()
    transporter.sendMail(mailOptions, lodash.noop)
  }

  function emailBuffer (str) {
    buffer.add(str)
    if (buffer.isFull()) send()
  }

  emailBuffer.send = send

  return emailBuffer
}

module.exports = createEmailBuffer
