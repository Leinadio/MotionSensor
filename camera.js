const { spawn } = require('child_process');
const express = require('express');
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
spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '0', '-fps', '60', '-o', 'pivideo.h264']);
spawn('MP4Box', ['-add', 'pivideo.h264', 'vid.mp4']);
// const child = spawn('raspivid', ['-t', '9999999', '-o', '-', '-n']);

// const videoStream = raspividStream({
//   rotation: 180,
//   preview: true
// });

app.get('/', (req, res) => {
  const a = fs.createReadStream('./vid.mp4');
  const head = {
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  a.on('data', (data) => {
    console.log('data : ', data)
  })
  a.send(res);
  // videoStream.on('data', (data) => {
  //   console.log('data : ', data.toString())
  // });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
