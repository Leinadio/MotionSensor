const { spawn } = require('child_process');
const express = require('express');
const app = express();
const { Readable } = require('stream');


const child = spawn('raspivid', ['-n', '-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']);
console.log('child : ', child);
const a = new Readable();

app.get('/', function(req, res) {
  const head = {
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  child.stdout.on('data', (data) => {
    a.push(data);
    a.pipe(res);
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
