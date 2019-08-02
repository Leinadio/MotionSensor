const raspivid = require('raspivid');
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const file = fs.createWriteStream(__dirname + '/video.h264');
  const video = raspivid({
    hflip: true,
    width: 1280,
    height: 1024,
    timeout: 0,
    framerate: 60
  });
  video.pipe(file);
  file.pipe(res)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
