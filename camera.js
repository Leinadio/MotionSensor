const { spawn } = require('child_process');
const express = require('express');
const app = express();
const { Readable } = require('stream');
const a = new Readable();

/**
 * -n = no preview
 * -hf Set horizontal flip
 * -w set width
 * -h set height
 * -t set timeout
 * -b Set bitrate
 * -o Set output
 * -fps Specify the frames per second to record
 * @type {ChildProcessWithoutNullStreams}
 */
const child1 = spawn('raspivid', [-hf', '-w', '1280', '-h', '1024', '-t', '5000', '-fps', '20', '-b', '5000000', '-o', 'pivideo.h264 ']);
const child2 = spawn('MP4Box', ['-add', 'pivideo.h264', 'pivideo.mp4']);

app.get('/', function(req, res) {
  const head = {
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  child2.stdout.on('data', (data) => {
    a.push(data);
    a.pipe(res);
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
