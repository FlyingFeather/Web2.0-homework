

var moduleSet = require('../routes/module'),
	Db = require('mongodb').Db,
		Connection = require('mongodb').Connection,
		Server = require('mongodb').Server;
module.exports = new Db(moduleSet.db, new Server(moduleSet.host, moduleSet.port), {safe: true});