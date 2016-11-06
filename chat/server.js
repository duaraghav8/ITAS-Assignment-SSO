let app = require ('express') ();

app.get ('/', (req, res) => {
	res.send ('<h3> Welcome Raghav! This is your chat app and you are authenticated :-) </h3>');
});

app.listen (9000);