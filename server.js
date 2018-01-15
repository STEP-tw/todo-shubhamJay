const http = require('http');
const app = require('./models/app.js');
const PORT = 3000;

const server = http.createServer(app);
server.listen(3000);
console.log(`server listening at ${PORT}`);
