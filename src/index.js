// Constants
const server = require("./routes/server")
const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);