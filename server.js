'use strict'

const	http 			      = require('http'),
  express			      = require('express'),
	bodyParser 		    = require('body-parser'),
	errorhandler 	    = require('errorhandler'),
	methodOverride 	  = require('method-override'),
  path              = require('path'),
  _                 = require('lodash')

//---------------- END OF CONFIG------------------------//

const IS_PRODUCTION = process.env.NODE_ENV == 'production'

global.appRoot = path.resolve(__dirname)

const app = express()
//app.use(logger('dev'))

//usual setup for express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(errorhandler())

app.use('/img', express.static(path.join(__dirname, 'dist/img') )) //static content
app.use('/js', express.static(path.join(__dirname, 'dist') )) //static content
app.use('/css', express.static(path.join(__dirname, 'dist') )) //static content

// view + view engine
// app.set('views', path.join(__dirname, '/server/views'))
// app.set('view engine', 'pug')

app.use(function(req, res, next){
  res.status(200).sendFile(__dirname + '/dist/index.html')
  return
})

const server = http.createServer(app)

server.listen(8080, function(){
  console.log('Express server listening on *: 8080')
})
