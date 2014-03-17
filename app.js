
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//DB requires
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://nodejitsu:dba6dddd5a8a23a9e57cb7abf8f9a921@troup.mongohq.com:10026/nodejitsudb1256742875');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/clients', routes.clients);
app.get('/about', routes.about);
//saving new bids
app.get('/quickbid', routes.quickbid);
app.get('/bidlist', routes.showBids(db));
app.post('/savebid', routes.saveBid(db));
//view single bid
//app.get('/bidlist/:client', routes.showClient(db));




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
