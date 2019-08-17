const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const app = express();
const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill();

camera.takePhoto().then((photo) => {
  console.log('photo : ', photo);
});

// app.get('/', (req, res) => {
//   const a = fs.createReadStream('./pivideo.h264');
//   const head = {
//     'Content-Type': 'video/h264',
//   };
//   res.writeHead(200, head);
//   a.on('data', (data) => {
//     console.log('data : ', data)
//   })
//   a.pipe(res);
//   // videoStream.on('data', (data) => {
//   //   console.log('data : ', data.toString())
//   // });
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
