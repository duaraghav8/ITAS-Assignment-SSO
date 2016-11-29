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
			return res.send ("Welcome Raghav! This is the <B>EMAIL</B> App");
		}
	}

	res.send ("Not logged into EMAIL");
});

app.listen (4001, () => {
	console.log ('Listening EMAIL on PORT 4001');
});