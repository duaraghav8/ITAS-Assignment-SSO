const express = require ('express'),
	bp = require ('body-parser'),
	jwt = require ('jsonwebtoken'),
	cookieParser = require ('cookie-parser');

let users = [];
let app = express ();

require ('./todo').init (function () { return users; });
require ('./email').init (function () { return users; });

function isLoggedIn (cookie) {
	for (i = 0; i < users.length; i++) {
		if (users [i] === cookie) {
			return true;
		}
	}

	return false;
}

app.use (cookieParser ('hubblescope'));
app.use (bp.urlencoded ({extended: true}));

app.get ('/', (req, res) => {
	cookie = req.get ('cookie');

	if (cookie) {
		cookie = cookie.replace ('token=', '');

		if (isLoggedIn (cookie)) {
			return res.send ('Hi Raghav!! <a href="/logout">Logout</a>');
		}
	}

	res.send ('<html><body><form action="http://127.0.0.1:8080/login" method = "POST">Username: <input type = "text" name="user">Password: <input type = "password" name="password"><input type = "submit"></form></body></html>')
});

app.get ('/logout', (req, res) => {
	cookie = req.get ('cookie');

	if (cookie) {
		cookie = cookie.replace ('token=', '');

		for (i = 0; i < users.length; i++) {
			if (users [i] === cookie) {
				users [i] = '$$$';
				res.status (200);
				res.redirect ('/');

				return;
			}
		}

		res.status (500).send ('could not log out');
	}
});

app.post ('/login', (req, res) => {
	console.log (req.body);
	
	if (req.body.user === 'raghav' && req.body.password === '1234') {
		token = jwt.sign ({user: 'raghav'}, 'hello');
		users.push (token);

		res.cookie ('token', token);
  		res.status (200).send (token);

		return;
	}

	res.status (401).send ('Incorrect credentials');
});

app.get ('/verify', (req, res) => {
	cookie = req.get ('cookie');

	if (cookie) {
		cookie = cookie.replace ('token=', '');

		if (isLoggedIn (cookie)) {
			return res.send ('Hi Raghav!! <a href="/logout">Logout</a>');
		}
	}

	res.send ('Not authorized..');
});

app.listen (8080, () => {
	console.log ('Listening IDENTITY PROVIDER on PORT 8080');
});

exports.getUsers = () => {
	return users;
};

exports.users = users;