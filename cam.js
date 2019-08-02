const raspivid = require('raspivid');
const express = require('express');
const fs = require('fs');


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

