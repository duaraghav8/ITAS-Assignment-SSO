/**
 * App tested on NODE v6.3.0
 * Uses latest ES6 features, so might not run on v4
 */

'use strict';

const express = require ('express'),
	https = require ('https'),
	jwt = require ('jsonwebtoken'),

	serveStatic = require ('serve-static'),
	bodyParser = require ('body-parser'),
	cookieParser = require ('cookie-parser'),

	fs = require ('fs'),
	path = require ('path');

//Since this is just a demo, I'm hard-coding auth credentials, no complication of Database =)
const credentials = {
	username: 'fizz',
	password: 'buzz',
	jwtSecret: 'butterchicken'
}

const middleware = {

	home: (req, res, next) => {
		res.redirect ('/signin');
	},

	signin: (req, res, next) => {
		if (req.cookies && req.cookies.auth_token) {
			let userObject;

			try {
				userObject = jwt.verify (req.cookies.auth_token, credentials.jwtSecret);
			} catch (e) {
				console.log (
					'Exception occured while trying to verify JWT: ', e.stack ()
				);
			}

			return res.send ('You are already logged in <b>' + userObject.username + '</b>!');
		}

		res.render ('signin');
	},

	signout: (req, res, next) => {
		res.clearCookie ('auth_token').sendStatus (200);
	},

	authenticate: (req, res, next) => {
		const {username, password} = req.body;

		if (username !== credentials.username || password !== credentials.password) {
			return res.sendStatus (401);
		}

		/*res.status (200).json ({
			token: jwt.sign ({username, via: 'auth.server.central'}, credentials.jwtSecret)
		});*/

		res.cookie (
			'auth_token',
			jwt.sign ({username, via: 'auth.server.central'}, credentials.jwtSecret)
		);
	}

};

let app = express ();
/*
let httpsServer = https.createServer ({

	key: fs.readFileSync (path.join (__dirname, 'ssl/server.key'), 'utf8'),
	cert: fs.readFileSync (path.join (__dirname, 'ssl/server.csr'), 'utf8'),
	passphrase: 'butterchicken'

}, app);
*/

app
	.set ('view engine', 'ejs')
	.set ('views', path.join (__dirname, '/public'))

	.use (bodyParser.json ())
	.use (bodyParser.urlencoded ({extended: true}))
	.use (cookieParser ())

	.get ('/', middleware.home)
	.get ('/signin', middleware.signin)
	.post ('/signin', middleware.authenticate)

let listener = app.listen (process.env.PORT || 8000, () => {
	console.log ('Listening on port: ' + listener.address ().port);
});

/*
let listener = httpsServer.listen (process.env.PORT || 8000, () => {
	console.log ('Listening on port: ', listener.address ().port);
});
*/