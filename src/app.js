const express = require('express');

const app = express();

app.get('/', (request, response) => {
	response.send('<h1>Hello DevOps</h1>');
});

function startServer(port = process.env.PORT || 3000) {
	return app.listen(port, () => {
		console.log(`App listening on port ${port}`);
	});
}

if (require.main === module) {
	startServer();
}

module.exports = { app, startServer };
