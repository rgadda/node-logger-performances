'use strict'

var app = require('express')()
var http = require('http')
var winston = require('winston')
var winstonExpress = require('express-winston')
var server = http.createServer(app)

app.use(winstonExpress.logger({
  transports: [
    new winston.transports.Console({
      json: true
    })
  ]
}))

app.get('/', function (req, res) {
  res.send('hello world')
})

var object = require('./object')
app.get('/bigObject', function (req, res) {
    res.send(object.big)
  })

app.get('/error', function (req, res, next) {
    next(new Error('kaboom'))
})
  
app.use(function (err, req, res, next) {
    req.log.error(err)
    res.statusCode = 500
    res.end('error')
})


server.listen(3000)