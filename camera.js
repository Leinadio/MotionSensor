const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const app = express();

const child = spawn('raspivid', ['-n', '-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']);
console.log('child : ', child);

child.stdout.on('data', (data) => {
  console.log('data : ', data);
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  // const path = './video_lisbonne.mp4';
  // const stat = fs.statSync(path);
  // const fileSize = stat.size;
  const head = {
    // 'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(child).pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
