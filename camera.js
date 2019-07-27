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
const child1 = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '0', '-fps', '60']);
// child1.on('exit', () => {
//   spawn('MP4Box', ['-new', 'pivideo.h264', 'pivideo.mp4']);
// });


app.get('/', (req, res) => {
  child1.stdout.on('data', (data) => {
    console.log('data ' , data);
  })
  res.end('Ok')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
