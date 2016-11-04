/**
 * App tested on NODE v6.3.0
 * Uses latest ES6 features, so might not run on v4
 */

'use strict';

const express = require ('express'),
	https = require ('https'),

	serveStatic = require ('serve-static'),
	bodyParser = require ('body-parser'),

	fs = require ('fs'),
	path = require ('path');

let app = express ();
/*
let httpsServer = https.createServer ({

	key: fs.readFileSync (path.join (__dirname, 'ssl/server.key'), 'utf8'),
	cert: fs.readFileSync (path.join (__dirname, 'ssl/server.csr'), 'utf8'),
	passphrase: 'butterchicken'

}, app);
*/

let listener = app.listen (process.env.PORT || 8000, () => {
	console.log ('Listening on port: ' + listener.address ().port);
});

/*
let listener = httpsServer.listen (process.env.PORT || 8000, () => {
	console.log ('Listening on port: ', listener.address ().port);
});
*/