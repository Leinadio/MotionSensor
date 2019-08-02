const { spawn } = require('child_process');
const express = require('express');
const http = require("http");
const fs = require('fs');
const raspividStream = require('raspivid-stream');
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
// const child = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '0', '-fps', '60']);
// const child = spawn('raspivid', ['-t', '9999999', '-o', '-', '-n']);

const videoStream = raspividStream({
  rotation: 180,
  preview: true
});

app.get('/', (req, res) => {
  videoStream.on('data', (data) => {
    console.log('data : ', data);
    data.pipe(res)
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
