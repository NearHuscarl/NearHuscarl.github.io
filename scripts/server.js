const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const root = path.join(__dirname, '..', 'public/');

// Serve the static files from the Gatsby app
app.use(express.static(root));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(root, '/404.html'));
});

const server = http.createServer(app);

if (require.main === module) {
	server.listen(10632);
} else {
	module.exports = server;
}
