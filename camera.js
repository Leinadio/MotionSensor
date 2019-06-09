const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const app = express();

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
const child1 = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '5000', '-fps', '20', '-b', '5000000', '-o', 'pivideo.h264']);
const child2 = spawn('MP4Box', ['-add', 'pivideo.h264', 'pivideo.mp4']);

app.get('/', (req, res) => {
  const path = './pivideo.mp4';
  const a = fs.access(path);
  console.log('a : ', a);

  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(path).pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listenidsdfdfng on port 3000!')
});
