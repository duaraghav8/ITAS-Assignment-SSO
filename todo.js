const express = require ('express');

getUsers = null;

exports.init = (cb) => {
	getUsers = cb;
}

let app = express ();

app.get ('/', (req, res) => {
	let cookie = req.get ('cookie');
	const users = getUsers ();

	if (cookie) { cookie = cookie.replace ('token=', ''); }

	for (i = 0; i < users.length; i++) {
		if (users [i] === cookie) {
			return res.send ("Welcome Raghav! This is the <b>TODO</b> App");
		}
	}

	res.send ("Not logged into TODO");
});

app.listen (4000, () => {
	console.log ('Listening TODO on PORT 4000');
});