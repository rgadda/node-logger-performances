'use strict'

var app = require('express')()
var http = require('http')

var server = http.createServer(app)
var pino = require('express-pino-logger')()
// var pino = require('pino')()

app.use(pino)

app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello\n');
    setTimeout(function() {
        res.end(' World\n');
    }, 5000); 
//   pino.info("Hello World")
})

app.get('/error', function (req, res, next) {
    next(new Error('kaboom'))
  })
  
// app.use(function (err, req, res, next) {
//     req.log.error(err)
//     res.statusCode = 500
//     res.end('error')
// })

var object = require('./object')
app.get('/bigObject', function (req, res) {
    res.send(object.big)
  })

server.listen(3000) 