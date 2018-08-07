'use strict'

var morgan = require('morgan')
var app = require('express')()

var http = require('http')
var server = http.createServer(app)

app.use(morgan('combined'))
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/error', function (req, res, next) {
    next(new Error('kaboom'))
  })
  
app.use(function (err, req, res, next) {
    req.log.error(err)
    res.statusCode = 500
    res.end('error')
})

var object = require('./object')
app.get('/bigObject', function (req, res) {
    res.send(object.big)
  })

server.listen(3001) 