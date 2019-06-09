const { spawn } = require('child_process');
const express = require('express');
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
const child1 = spawn('raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '5000', '-fps', '20', '-b', '5000000', '-o', '-', '|', 'MP4Box', '-add', 'pivideo.h264', 'pivideo.mp4']);
// const child2 = spawn('MP4Box', ['-add', 'pivideo.h264', 'pivideo.mp4']);
// console.log('child2 : ', child2);

app.get('/', function(req, res) {
  child2.on('data', (data) => {
    console.log('data : ', data);
  })
  // const head = {
  //   'Content-Type': 'video/mp4',
  // };
  res.end('Hello')
  // child1.stdout.on('data', (data) => {
  //   console.log('data : ', data.toString());
  //   res.send(data)
  // })
});

app.listen(3000, function () {
  console.log('Example app listenidsdfdfng on port 3000!')
});
