const http = require('http');
const app = require('./app.js');
const PORT = 3000;

const server = http.createServer(app);
server.listen(3000);
console.log(`server listening at ${PORT}`);
