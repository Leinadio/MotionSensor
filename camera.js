const { spawn } = require('child_process');
const express = require('express');
const http = require('http');
const app = express();

const child = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']);

const server = http.createServer(function(request, response) {
  child.stdout.pipe(response);
});
server.listen(8080);
console.log("Server is listening on port 8080");
