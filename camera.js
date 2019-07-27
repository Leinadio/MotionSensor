const { spawn } = require('child_process');
const express = require('express');
const http = require("http");
const fs = require('fs');
const app = express();

/**
 * -n = no preview
 * -hf Set horizontal flip
 * -w set width
 * -h set height
 * -t set timeout
 * -b Set bitrate
 * -fps Specify the frames per second to record
 * -o Set output
 * @type {ChildProcessWithoutNullStreams}
 */
const child = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '0', '-fps', '60', '-o', '-']);

// app.get('/', (req, res) => {
//   child.stdout.pipe(res)
// });

const server = http.createServer(function(request, response) {
  child.stdout.pipe(response);
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
