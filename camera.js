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
 * -fps Specify the frames per second to record
 * -o Set output
 * @type {ChildProcessWithoutNullStreams}
 */
const child1 = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '0', '-fps', '20', '-b', '36000000', '-o', 'pivideo.h264']);
child1.on('exit', () => {
  spawn('MP4Box', ['-new', 'pivideo.h264', 'pivideo.mp4']);
});

app.get('/', (req, res) => {
  const path = './pivideo.mp4';
  fs.access(path, (err) => {
    if (err) {
      res.end('No file exist');
      return;
    }
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
