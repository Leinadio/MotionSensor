const { spawn } = require('child_process');
const express = require('express');
const app = express();

const vstream = spawn('raspivid', ['-t', '5000', '-o', 'vid.h264', '-n']);

app.get('/stream', (req, res) => {
  vstream.stdout.pipe(res);
});

app.listen(3000);
