let app = require ('express') ();

app.get ('/', (req, res) => {
	res.send ('<h3> Welcome Raghav! This is your email app and you are authenticated :-) </h3>');
});

app.listen (8000);