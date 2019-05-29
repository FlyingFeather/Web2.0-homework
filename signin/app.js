var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var moduleSet = require('./routes/module');
var flash = require('connect-flash');

var app = express();
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: moduleSet.cookieSecret,
	resave: false,
	saveUninitialized: false,
	key: moduleSet.db,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},//7 天
	store: new mongoStore({
		db: moduleSet.db,
		host: moduleSet.host,
		port: moduleSet.port
	})
}));

routes(app);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});