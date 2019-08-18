const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const app = express();
const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill();

camera.takePhoto().then((photo) => {
  console.log('photo : ', photo);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
